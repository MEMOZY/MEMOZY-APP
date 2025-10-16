import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../common/ThemedText";
import { Colors } from "@/constants/Colors";
import { CheckIcon, XIcon } from "@/assets/images/icons";
import { acceptFriendRequest, rejectFriendRequest } from "@/api/friend";

interface RequestFriendItemProps {
    name: string;
    imageUrl: string;
    userId: string;
    fetchAll: () => Promise<void>;
}

export function RequestFriendItem({
    name,
    imageUrl,
    userId,
    fetchAll,
}: RequestFriendItemProps) {
    const handleRejectFriend = async () => {
        await rejectFriendRequest(userId);
        await fetchAll();
    };

    const handleAcceptFriend = async () => {
        await acceptFriendRequest(userId);
        await fetchAll();
    };

    return (
        <View style={styles.friendContainer}>
            <Image
                source={{
                    uri: imageUrl,
                }}
                style={styles.profileImage}
            />
            <ThemedText
                type="body1b"
                lightColor={Colors.gray5}
                darkColor={Colors.gray5}
            >
                {name}
            </ThemedText>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={handleRejectFriend}>
                    <View style={styles.button}>
                        <XIcon />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAcceptFriend}>
                    <View style={styles.button}>
                        <CheckIcon />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    profileImage: {
        width: 32,
        height: 32,
        borderRadius: 100,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
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
    buttonsContainer: {
        flexDirection: "row",
        gap: 12,
        justifyContent: "flex-end",
        flex: 1,
    },
    button: {
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.white,
        borderRadius: 8,
        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)",
    },
});
