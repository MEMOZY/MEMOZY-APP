import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { ThemedText } from "../common/ThemedText";
import { Colors } from "@/constants/Colors";
import { TrashIcon } from "@/assets/images/icons";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

interface FriendItemProps {
    name: string;
    imageUrl: string;
    onSwipeLeft?: () => void; // 왼쪽으로 밀었을 때 실행할 함수 추가
}

export function FriendItem({ name, imageUrl, onSwipeLeft }: FriendItemProps) {
    // 왼쪽 스와이프 시 나타나는 액션 정의
    const renderRightActions = () => {
        return (
            <TouchableOpacity style={styles.rightAction} onPress={onSwipeLeft}>
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
