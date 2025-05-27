// FriendList.tsx
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { PlusIcon } from "@/assets/images/icons";
import { useQuery } from "@tanstack/react-query";
import { Friend, getFriends } from "@/api/friend";

interface FriendListProps {
    onAddFriend?: () => void;
}

export default function FriendList({ onAddFriend }: FriendListProps) {
    const { data: friends, isLoading } = useQuery<Friend[]>({
        queryKey: ["friends"],
        queryFn: getFriends,
    });

    return (
        !isLoading &&
        friends && (
            <View style={styles.friendList}>
                {friends.map((user, index) => (
                    <Image
                        key={index}
                        source={{ uri: user.profileImageUrl }}
                        style={styles.profileImage}
                    />
                ))}
                {onAddFriend && (
                    <TouchableOpacity onPress={onAddFriend}>
                        <View style={[styles.profileImage, styles.addFriend]}>
                            <PlusIcon />
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        )
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
    addFriend: {
        justifyContent: "center",
        alignItems: "center",
    },
});
