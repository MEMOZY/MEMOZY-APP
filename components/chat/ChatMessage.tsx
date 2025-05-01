import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ThemedText } from "../common/ThemedText";
import { Colors } from "@/constants/Colors";

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
    const [dots, setDots] = useState("대화를 작성하는 중");
    const isTyping = text === "__TYPING__";

    useEffect(() => {
        if (!isTyping) return;

        const interval = setInterval(() => {
            setDots((prev) =>
                prev === "대화를 작성하는 중..."
                    ? "대화를 작성하는 중"
                    : prev + "."
            );
        }, 500);

        return () => clearInterval(interval);
    }, [isTyping]);

    return (
        <View
            style={{ gap: 10, alignSelf: isMine ? "flex-end" : "flex-start" }}
        >
            {imageUrl && (
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
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
                <ThemedText type="body2">{isTyping ? dots : text}</ThemedText>
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
        borderRadius: 12,
        alignSelf: "flex-start",
    },
});
