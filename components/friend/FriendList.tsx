// FriendList.tsx
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { PlusIcon } from "@/assets/images/icons";
import { Friend } from "@/api/friend";

interface FriendListProps {
    friends: Friend[];
    onAddFriend?: () => void;
    selectable?: boolean;
    onChangeSelected?: (selected: Friend[]) => void;
}

export default function FriendList({
    friends,
    onAddFriend,
    selectable = false,
    onChangeSelected,
}: FriendListProps) {
    const [selected, setSelected] = useState<Friend[]>([]);

    const toggleSelect = (friend: Friend) => {
        const isSelected = selected.some((f) => f.userId === friend.userId);
        const newSelected = isSelected
            ? selected.filter((f) => f.userId !== friend.userId)
            : [...selected, friend];
        setSelected(newSelected);
        onChangeSelected?.(newSelected);
    };

    return (
        <View style={styles.friendList}>
            {friends.map((user, index) => {
                const isSelected = selected.some(
                    (f) => f.userId === user.userId
                );
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            if (selectable) toggleSelect(user);
                        }}
                        activeOpacity={0.8}
                    >
                        <Image
                            source={{ uri: user.profileImageUrl }}
                            style={[
                                styles.profileImage,
                                isSelected && styles.selectedBorder,
                            ]}
                        />
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
    );
}

const styles = StyleSheet.create({
    friendList: {
        flexDirection: "row",
        gap: 10,
    },
    profileImage: {
        width: 52,
        height: 52,
        borderRadius: 100,
        backgroundColor: "#fff",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },
    selectedBorder: {
        borderColor: "#000", // or your theme color
        borderWidth: 2,
    },
    addFriend: {
        justifyContent: "center",
        alignItems: "center",
    },
});
