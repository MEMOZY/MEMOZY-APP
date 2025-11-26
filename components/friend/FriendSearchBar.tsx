import { requestFriend } from "@/api/friend";
import { getUserIdByFriendCode } from "@/api/user";
import { SearchIcon } from "@/assets/images/icons";
import { Colors } from "@/constants/Colors";
import { useUI } from "@/hooks/useUI";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface FriendSearchBarProps {
    fetchAll: () => Promise<void>;
}

export function FriendSearchBar({ fetchAll }: FriendSearchBarProps) {
    const [code, setCode] = useState("");
    const { showModal, showSnackbar } = useUI();

    const handleSearch = async () => {
        if (!code.trim()) {
            showSnackbar({
                message: "코드를 입력해주세요.",
                color: Colors.red,
            });
            return;
        }

        try {
            const userId = await getUserIdByFriendCode(code);

            showModal({
                title: "친구 추가",
                subtitle: "친구 추가 요청을 전송하시겠습니까?",
                confirmText: "전송",
                cancelText: "취소",
                onConfirm: async () => {
                    try {
                        await requestFriend(userId);
                        showSnackbar({
                            message: "친구 추가 요청이 전송되었습니다.",
                        });
                        await fetchAll();
                    } catch (error) {
                        showSnackbar({
                            message: "친구 추가에 실패했습니다.",
                            color: Colors.red,
                        });
                    }
                },
            });
        } catch (error) {
            showSnackbar({
                message: "존재하지 않는 코드입니다.",
                color: Colors.red,
            });
        }
    };

    return (
        <View style={styles.searchContainer}>
            <TextInput
                placeholder="상대방 코드로 검색"
                placeholderTextColor={Colors.gray5}
                style={styles.searchInput}
                value={code}
                onChangeText={(text) => setCode(text)}
                autoCapitalize="characters"
                autoCorrect={false}
                autoComplete="off"
                autoFocus={false}
                keyboardType="ascii-capable"
                onSubmitEditing={handleSearch}
            />
            <TouchableOpacity onPress={handleSearch}>
                <SearchIcon />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 12,
        borderRadius: 12,
        backgroundColor: Colors.gray3,
        height: 48,
        gap: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        fontFamily: "Pretendard-Regular",
    },
});
