// FriendList.tsx
import React, { useState } from "react";
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    ScrollView,
} from "react-native";
import { PlusIcon } from "@/assets/images/icons";
import { Friend } from "@/api/friend";
import { SelectedShare, SharePermission } from "@/types/share";

interface FriendListProps {
    friends: Friend[];
    onAddFriend?: () => void;
    selectable?: boolean;
    permissionMode?: boolean; // 권한 토글 켜기
    defaultPermission?: SharePermission; // "read" | "both"
    onChangeSelected?: (selected: SelectedShare[]) => void; // 권한 포함
}

export default function FriendList({
    friends,
    onAddFriend,
    selectable = false,
    permissionMode = false,
    defaultPermission = "read",
    onChangeSelected,
}: FriendListProps) {
    const [selected, setSelected] = useState<SelectedShare[]>([]);

    const isSelected = (userId: string | number) =>
        selected.some((s) => s.friend.userId === userId);

    const getPermission = (userId: string | number): SharePermission | null => {
        const found = selected.find((s) => s.friend.userId === userId);
        return found ? found.permission : null;
    };

    const selectFriend = (friend: Friend) => {
        if (!selectable) return;
        const exists = selected.find((s) => s.friend.userId === friend.userId);

        if (permissionMode) {
            let next: SelectedShare[];

            if (!exists) {
                // 1) 미선택 → 읽기 (리터럴 고정)
                const first: SelectedShare = {
                    friend,
                    permission: (defaultPermission ??
                        "read") as SharePermission,
                };
                next = [...selected, first] as SelectedShare[];
            } else if (exists.permission === "read") {
                // 2) 읽기 → 읽기+수정 (리터럴 고정)
                const updated: SelectedShare = {
                    ...exists,
                    permission: "both" as const,
                };
                next = selected.map((s) =>
                    s.friend.userId === friend.userId ? updated : s
                ) as SelectedShare[];
            } else {
                // 3) 읽기+수정 → 공유 해제
                next = selected.filter(
                    (s) => s.friend.userId !== friend.userId
                ) as SelectedShare[];
            }

            setSelected(next); // SelectedShare[] 타입 확정
            onChangeSelected?.(next);
            return;
        }

        // 권한 모드가 아니면 일반 선택/해제
        if (!exists) {
            const added: SelectedShare = {
                friend,
                permission: "read" as const,
            };
            const next = [...selected, added] as SelectedShare[];
            setSelected(next);
            onChangeSelected?.(next);
        } else {
            const next = selected.filter(
                (s) => s.friend.userId !== friend.userId
            ) as SelectedShare[];
            setSelected(next);
            onChangeSelected?.(next);
        }
    };

    const deselectFriend = (friend: Friend) => {
        const next = selected.filter((s) => s.friend.userId !== friend.userId);
        setSelected(next);
        onChangeSelected?.(next);
    };

    const badgeStyle = (p: SharePermission | null) => {
        if (!p) return [styles.permBadge, styles.permNone];
        if (p === "read") return [styles.permBadge, styles.permRead];
        return [styles.permBadge, styles.permBoth];
    };

    const badgeText = (p: SharePermission | null) => {
        if (!p) return "";
        return p === "read" ? "읽기" : "수정";
    };

    return (
        // 좌우 스크롤 뷰
        <ScrollView horizontal style={styles.scrollView}>
            <View style={styles.friendList}>
                {friends.map((user, index) => {
                    const selectedNow = isSelected(user.userId);
                    const perm = getPermission(user.userId);

                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                if (selectable) selectFriend(user);
                            }}
                            onLongPress={() => {
                                if (selectable && selectedNow)
                                    deselectFriend(user);
                            }}
                            activeOpacity={0.85}
                        >
                            <View>
                                <Image
                                    source={{ uri: user.profileImageUrl }}
                                    style={[
                                        styles.profileImage,
                                        selectedNow && styles.selectedBorder,
                                    ]}
                                />
                                {permissionMode && selectedNow && (
                                    <View style={badgeStyle(perm)}>
                                        <Text style={styles.permText}>
                                            {badgeText(perm)}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    );
                })}
                {onAddFriend && (
                    <TouchableOpacity onPress={onAddFriend}>
                        <View style={[styles.profileImage, styles.addFriend]}>
                            <PlusIcon />
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: { width: "100%", paddingVertical: 4, paddingLeft: 4 },
    friendList: { flexDirection: "row", gap: 10, flexWrap: "wrap" },

    profileImage: {
        width: 52,
        height: 52,
        borderRadius: 100,
        backgroundColor: "#fff",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    },
    selectedBorder: { borderColor: "#000", borderWidth: 2 },
    addFriend: { justifyContent: "center", alignItems: "center" },

    permBadge: {
        position: "absolute",
        right: -4,
        bottom: -4,
        borderRadius: 999,
        paddingHorizontal: 8,
        height: 20,
        minWidth: 34,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
    },
    permText: { fontSize: 10, fontWeight: "600", color: "#111" },

    permNone: { backgroundColor: "#eee", borderColor: "#ddd" },
    permRead: { backgroundColor: "#E8F3FF", borderColor: "#BBD8FF" },
    permBoth: { backgroundColor: "#E9FFE8", borderColor: "#C7F7C4" },
});
