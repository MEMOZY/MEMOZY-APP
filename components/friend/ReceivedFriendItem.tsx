import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../common/ThemedText";
import { Colors } from "@/constants/Colors";
import { TrashIcon } from "@/assets/images/icons";

interface ReceivedFriendItemProps {
    name: string;
    imageUrl: string;
}

export function ReceivedFriendItem({
    name,
    imageUrl,
}: ReceivedFriendItemProps) {
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
            <TouchableOpacity style={{ marginLeft: "auto" }}>
                <TrashIcon />
            </TouchableOpacity>
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
});
