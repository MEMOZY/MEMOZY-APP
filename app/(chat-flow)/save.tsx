import { Friend, getFriends } from "@/api/friend";
import { Memory, postMemory } from "@/api/memory";
import Button from "@/components/common/Button";
import { GlobalModal } from "@/components/common/GlobalModal";
import PageLayout from "@/components/common/PageLayout";
import { ThemedText } from "@/components/common/ThemedText";
import Titled from "@/components/common/Titled";
import FriendList from "@/components/friend/FriendList";
import CategorySelector from "@/components/save/CategorySelector";
import { DateRangePicker } from "@/components/save/DateRangePicker";
import { Colors } from "@/constants/Colors";
import { useUI } from "@/hooks/useUI";
import { SelectedShare } from "@/types/share";
import { formatDateYMD } from "@/utils/formatDate";
import { useQuery } from "@tanstack/react-query";
import { router, useGlobalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, Modal, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function SaveScreen() {
    const glob = useGlobalSearchParams();
    const { startDate, endDate, sessionId } = glob;
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState<Memory["category"] | null>(null);
    const [selectedDates, setSelectedDates] = useState<{
        startDate: Date;
        endDate: Date;
    }>({
        startDate: startDate ? new Date(startDate as string) : new Date(),
        endDate: endDate ? new Date(endDate as string) : new Date(),
    });

    const { data: friends, isLoading } = useQuery<Friend[]>({
        queryKey: ["friends"],
        queryFn: getFriends,
    });

    const [selectedFriends, setSelectedFriends] = useState<SelectedShare[]>([]);

    const { showSnackbar } = useUI();
    return (
        !isLoading && (
            <PageLayout
                headerTitle="저장"
                backText="이전"
                hasBack
                style={{
                    justifyContent: "space-between",
                }}
            >
                <View style={styles.contentContainer}>
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
                                value={title}
                                onChangeText={(text) => {
                                    setTitle(text);
                                }}
                            />
                        </View>
                    </Titled>
                    <DateRangePicker
                        startDate={selectedDates.startDate.toString()}
                        endDate={selectedDates.endDate.toString()}
                        onChange={(range) => {
                            setSelectedDates(range);
                        }}
                    />

                    <Titled title="카테고리">
                        <CategorySelector
                            value={category}
                            onChange={setCategory}
                        />
                    </Titled>

                    {friends && friends.length > 0 && (
                        <Titled title="함께하는 친구">
                            <FriendList
                                friends={friends}
                                selectable
                                permissionMode
                                defaultPermission="VIEWER"
                                onChangeSelected={(selected) =>
                                    setSelectedFriends(selected)
                                }
                            />
                        </Titled>
                    )}
                </View>
                <Button
                    title="저장하기"
                    onPress={async () => {
                        if (!category || !title) {
                            showSnackbar({
                                message: "입력되지 않은 정보가 있습니다.",
                                color: Colors.red,
                            });
                            return;
                        }
                        await postMemory({
                            title: title,
                            category: category!,
                            startDate: formatDateYMD(selectedDates.startDate),
                            endDate: formatDateYMD(selectedDates.endDate),
                            sessionId: sessionId as string,
                            accesses: selectedFriends.map((friend) => ({
                                userId: Number(friend.friend.userId),
                                permissionLevel: friend.permission,
                            })),
                        })
                            .then(() => {
                                router.replace("/(tabs)");
                            })
                            .catch((error) => {
                                console.error("저장 오류:", error);
                                showSnackbar({
                                    message:
                                        "저장에 실패했습니다. 다시 시도해주세요.",
                                    color: Colors.red,
                                });
                            });
                    }}
                />
            </PageLayout>
        )
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
    contentContainer: {
        padding: 20,
        gap: 20,
        backgroundColor: Colors.white,
        borderRadius: 12,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    },
    category: {
        backgroundColor: Colors.white,
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
        borderRadius: 20,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        paddingHorizontal: 16,
        height: 34,
        alignSelf: "flex-start",
    },
});
