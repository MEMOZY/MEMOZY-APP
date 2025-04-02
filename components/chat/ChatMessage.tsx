import { Colors } from "@/constants/Colors";
import { Image, StyleSheet, View } from "react-native";
import { ThemedText } from "../common/ThemedText";

interface ChatMessageProps {
    isMine?: boolean;
    imageUrl?: string;
    text?: string;
}

export default function ChatMessage({
    isMine = false,
    imageUrl,
    text,
}: ChatMessageProps) {
    return (
        <View
            style={{ gap: 10, alignSelf: isMine ? "flex-end" : "flex-start" }}
        >
            {imageUrl && (
                <Image
                    source={{ uri: "https://example.com/image.jpg" }}
                    style={styles.image}
                    resizeMode="contain"
                />
            )}
            <View
                style={[
                    styles.messageContainer,
                    {
                        backgroundColor: isMine ? Colors.gray3 : Colors.gray2,
                    },
                ]}
            >
                <ThemedText type="body2">{text}</ThemedText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        maxWidth: 120,
        minHeight: 120,
        backgroundColor: Colors.gray3,
        borderRadius: 10,
    },
    messageContainer: {
        padding: 10,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        borderRadius: 12,
        alignSelf: "flex-start",
    },
});
