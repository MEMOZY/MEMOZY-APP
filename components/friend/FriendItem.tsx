import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ThemedText } from "../common/ThemedText";
import { Colors } from "@/constants/Colors";
import { TrashIcon } from "@/assets/images/icons";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { useQueryClient } from "@tanstack/react-query";
import { deleteFriend } from "@/api/friend";
import { Image } from "expo-image";

interface FriendItemProps {
    name: string;
    imageUrl: string;
    userId: string; // 추가된 userId prop
    fetchAll: () => Promise<void>;
}

export function FriendItem({
    name,
    imageUrl,
    userId,
    fetchAll,
}: FriendItemProps) {
    const onDeleteFriend = async () => {
        await deleteFriend(userId).finally(() => fetchAll());
    };
    // 왼쪽 스와이프 시 나타나는 액션 정의
    const renderRightActions = () => {
        return (
            <TouchableOpacity
                style={styles.rightAction}
                onPress={onDeleteFriend}
            >
                <TrashIcon />
            </TouchableOpacity>
        );
    };

    return (
        <Swipeable renderRightActions={renderRightActions}>
            <View style={styles.friendContainer}>
                <Image source={{ uri: imageUrl }} style={styles.profileImage} />
                <ThemedText
                    type="body1b"
                    lightColor={Colors.gray5}
                    darkColor={Colors.gray5}
                >
                    {name}
                </ThemedText>
            </View>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    profileImage: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.white,
    },
    friendContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: 56,
        gap: 12,
        backgroundColor: Colors.gray2,
        borderRadius: 12,
        paddingHorizontal: 12,
    },
    rightAction: {
        backgroundColor: "#f9c1be",
        justifyContent: "center",
        alignItems: "center",
        width: 56,
        height: "100%",
        borderRadius: 12,
        marginLeft: 8,
    },
});
