import { Memory, putMemory } from "@/api/memory";
import PageLayout from "@/components/common/PageLayout";
import { ThemedText } from "@/components/common/ThemedText";
import LogCard from "@/components/edit/LogCard";
import { Colors } from "@/constants/Colors";
import { useUI } from "@/hooks/useUI";
import { useNavigation, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
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
    const markDirty = useCallback(() => setDirty(true), []);

    const handleSave = useCallback(() => {
        putMemory(memory.id, {
            title: memory.title,
            category: memory.category,
            startDate: memory.startDate,
            endDate: memory.endDate,
            memoryItems: memory.memoryItems,
            accesses: memory.accessInfos,
        }).finally(() => {
            onBack();
        });
    }, [memory]);

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
                if (!dirty) return; // 변경 없으면 그냥 나감

                e.preventDefault(); // 이탈 막기 → 모달 띄우기

                showModal({
                    title: "정말 취소하시겠습니까?",
                    subtitle: "진행 중인 작업이 모두 취소됩니다.",
                    confirmText: "취소",
                    cancelText: "돌아가기",
                    onConfirm: () => {
                        // 확인(=정말 나가기) 시: 리스너 임시 해제 후 원래 액션 수행
                        const sub = navigation.addListener(
                            "beforeRemove",
                            () => {}
                        );
                        sub(); // 즉시 해제
                        setDirty(false);
                        onBack();
                    },
                });
            }
        );

        // Android 하드웨어 백 안전망(대부분 beforeRemove로 커버됨)
        const onHardwareBack = () => {
            if (!dirty) return false; // 기본 동작(뒤로가기)
            showModal({
                title: "정말 취소하시겠습니까?",
                subtitle: "진행 중인 작업이 모두 취소됩니다.",
                confirmText: "취소",
                cancelText: "돌아가기",
                onConfirm: () => {
                    setDirty(false);
                    onBack();
                },
            });
            return true; // 우리가 처리했음
        };
        const backSub = BackHandler.addEventListener(
            "hardwareBackPress",
            onHardwareBack
        );

        return () => {
            beforeRemove();
            backSub.remove();
        };
    }, [dirty, navigation, showModal, onBack]);

    return (
        <PageLayout
            headerTitle="편집"
            hasBack
            backText="취소"
            scrollView
            onBack={onBack}
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
