import {
    Memory,
    acquireEditLock,
    extendEditLock,
    putMemory,
    releaseEditLock,
} from "@/api/memory";
import PageLayout from "@/components/common/PageLayout";
import { ThemedText } from "@/components/common/ThemedText";
import LogCard from "@/components/edit/LogCard";
import { Colors } from "@/constants/Colors";
import { useUI } from "@/hooks/useUI";
import { useNavigation } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
    BackHandler,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Titled from "../common/Titled";
import { DateRangePicker } from "../save/DateRangePicker";
import CategorySelector from "../save/CategorySelector";

export default function LogEdit({
    initialMemory,
    onBack,
}: {
    initialMemory: Memory;
    onBack: () => void;
}) {
    const [memory, setMemory] = useState<Memory>(initialMemory);
    const { showModal } = useUI();
    const navigation = useNavigation();
    const [dirty, setDirty] = useState(false);
    const [lockToken, setLockToken] = useState<string | null>(null);
    const markDirty = useCallback(() => setDirty(true), []);
    const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const lockTokenRef = useRef<string | null>(null);
    const savedRef = useRef(false);

    const clearHeartbeat = useCallback(() => {
        if (heartbeatRef.current) {
            clearInterval(heartbeatRef.current);
            heartbeatRef.current = null;
        }
    }, []);

    const cleanupLock = useCallback(async () => {
        clearHeartbeat();
        const token = lockTokenRef.current;
        if (!token) return;
        lockTokenRef.current = null;
        try {
            await releaseEditLock(memory.id, token);
        } catch (error) {
            console.log("편집 락 해제 실패", error);
        }
    }, [memory.id, clearHeartbeat]);

    const performExit = useCallback(() => {
        setDirty(false);
        cleanupLock()
            .catch(() => {})
            .finally(() => {
                onBack();
            });
    }, [cleanupLock, onBack]);

    const performExitWithoutRelease = useCallback(() => {
        // 기록 수정이 성공한 경우에는 서버에서 편집 락을 정리하므로
        // 클라이언트에서는 편집 락 해제 API를 호출하지 않는다.
        setDirty(false);
        savedRef.current = true;
        clearHeartbeat();
        lockTokenRef.current = null;
        onBack();
    }, [clearHeartbeat, onBack]);

    const requestExit = useCallback(() => {
        if (!dirty) {
            performExit();
            return;
        }
        showModal({
            title: "정말 취소하시겠습니까?",
            subtitle: "진행 중인 작업이 모두 취소됩니다.",
            confirmText: "취소",
            cancelText: "돌아가기",
            onConfirm: () => {
                performExit();
            },
        });
    }, [dirty, showModal, performExit]);

    const handleSave = useCallback(() => {
        if (!lockTokenRef.current) {
            showModal({
                title: "편집 준비 중입니다.",
                subtitle: "잠시 후 다시 시도해주세요.",
                confirmText: "확인",
            });
            return;
        }
        putMemory(memory.id, {
            title: memory.title,
            category: memory.category,
            startDate: memory.startDate,
            endDate: memory.endDate,
            memoryItems: memory.memoryItems,
            accesses: memory.accessInfos.map((access) => ({
                userId: access.userId,
                permissionLevel: access.permissionLevel,
            })),
            editLockToken: lockTokenRef.current,
        })
            .then(() => {
                performExitWithoutRelease();
            })
            .catch(() => {
                showModal({
                    title: "저장에 실패했습니다.",
                    subtitle: "잠시 후 다시 시도해주세요.",
                    confirmText: "확인",
                });
            });
    }, [memory, performExitWithoutRelease, showModal]);

    // memory 변경 시 dirty 체크
    useEffect(() => {
        if (initialMemory !== memory) {
            markDirty();
        }
    }, [memory, initialMemory]);

    // 모든 '뒤로가기' 시도를 가로채는 공용 가드
    useEffect(() => {
        const beforeRemove = navigation.addListener(
            "beforeRemove",
            (e: any) => {
                if (!dirty) return;
                e.preventDefault();
                showModal({
                    title: "정말 취소하시겠습니까?",
                    subtitle: "진행 중인 작업이 모두 취소됩니다.",
                    confirmText: "취소",
                    cancelText: "돌아가기",
                    onConfirm: () => {
                        performExit();
                    },
                });
            }
        );

        const onHardwareBack = () => {
            if (!dirty) {
                performExit();
                return true;
            }
            showModal({
                title: "정말 취소하시겠습니까?",
                subtitle: "진행 중인 작업이 모두 취소됩니다.",
                confirmText: "취소",
                cancelText: "돌아가기",
                onConfirm: () => {
                    performExit();
                },
            });
            return true;
        };
        const backSub = BackHandler.addEventListener(
            "hardwareBackPress",
            onHardwareBack
        );

        return () => {
            beforeRemove();
            backSub.remove();
        };
    }, [dirty, navigation, showModal, performExit]);

    useEffect(() => {
        let mounted = true;
        const acquireLock = async () => {
            try {
                const lock = await acquireEditLock(memory.id);
                if (!lock?.acquired || !lock.token) {
                    throw new Error("편집 락을 획득하지 못했습니다.");
                }
                if (mounted) {
                    setLockToken(lock.token);
                }
            } catch (error) {
                if (!mounted) return;
                showModal({
                    title: "편집할 수 없습니다.",
                    subtitle: "다른 사용자가 이 기록을 편집 중입니다.",
                    confirmText: "확인",
                    onConfirm: () => {
                        performExit();
                    },
                    onCancel: () => {
                        performExit();
                    },
                });
            }
        };
        acquireLock();

        return () => {
            mounted = false;
        };
    }, [memory.id, showModal, performExit]);

    useEffect(() => {
        lockTokenRef.current = lockToken;
    }, [lockToken]);

    useEffect(() => {
        if (!lockToken) return;

        clearHeartbeat();
        heartbeatRef.current = setInterval(async () => {
            if (!lockTokenRef.current) return;
            try {
                await extendEditLock(memory.id, lockTokenRef.current);
            } catch (error) {
                clearHeartbeat();
                showModal({
                    title: "편집 세션이 만료되었습니다.",
                    subtitle: "다시 시도해주세요.",
                    confirmText: "확인",
                    onConfirm: () => {
                        performExit();
                    },
                    onCancel: () => {
                        performExit();
                    },
                });
            }
        }, 120000);

        return () => {
            clearHeartbeat();
        };
    }, [lockToken, memory.id, showModal, clearHeartbeat, performExit]);

    useEffect(() => {
        return () => {
            // 저장에 성공한 경우에는 편집 락 해제 API를 별도로 호출하지 않는다.
            if (!savedRef.current) {
                cleanupLock();
            } else {
                clearHeartbeat();
                lockTokenRef.current = null;
            }
        };
    }, [cleanupLock, clearHeartbeat]);

    return (
        <PageLayout
            headerTitle="편집"
            hasBack
            backText="취소"
            scrollView
            onBack={requestExit}
            headerRight={
                <TouchableOpacity onPress={handleSave}>
                    <ThemedText
                        type="body1"
                        lightColor={Colors.gray6}
                        darkColor={Colors.gray6}
                    >
                        저장
                    </ThemedText>
                </TouchableOpacity>
            }
            style={{ gap: 20, paddingBottom: 80 }}
        >
            <Titled title="제목">
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="제목을 입력하세요"
                        placeholderTextColor={Colors.gray4}
                        style={styles.input}
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoComplete="off"
                        maxLength={20}
                        value={memory.title}
                        onChangeText={(text) => {
                            setMemory({ ...memory, title: text });
                        }}
                    />
                </View>
            </Titled>
            <DateRangePicker
                startDate={memory.startDate}
                endDate={memory.endDate}
                onChange={(range) => {
                    setMemory({
                        ...memory,
                        startDate: range.startDate.toISOString(),
                        endDate: range.endDate.toISOString(),
                    });
                }}
            />
            <Titled title="카테고리">
                <CategorySelector
                    value={memory.category}
                    onChange={(category) => {
                        setMemory({ ...memory, category });
                    }}
                />
            </Titled>
            <View style={{ gap: 10 }}>
                {memory.memoryItems.map((item) => (
                    <LogCard
                        key={item.sequence}
                        imageUrl={item.imageUrl}
                        text={item.content}
                        onDelete={() => {
                            setMemory({
                                ...memory,
                                memoryItems: memory.memoryItems.filter(
                                    (memoryItem) =>
                                        memoryItem.sequence !== item.sequence
                                ),
                            });
                        }}
                        onChangeText={(text) => {
                            setMemory({
                                ...memory,
                                memoryItems: memory.memoryItems.map(
                                    (memoryItem) =>
                                        memoryItem.sequence === item.sequence
                                            ? { ...memoryItem, content: text }
                                            : memoryItem
                                ),
                            });
                        }}
                        editable
                    />
                ))}
            </View>
        </PageLayout>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        height: 42,
        backgroundColor: Colors.white,
        borderRadius: 12,
        paddingHorizontal: 12,
        justifyContent: "center",
        alignSelf: "flex-start",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        minWidth: 120,
    },
    input: {
        fontFamily: "Pretendard-Regular",
        fontSize: 13,
        color: Colors.gray6,
        flex: 1,
    },
});
