import { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";
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
    const isTyping = text === "__TYPING__";

    // 점 3개의 애니메이션 값
    const dot1 = useRef(new Animated.Value(1)).current;
    const dot2 = useRef(new Animated.Value(1)).current;
    const dot3 = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (!isTyping) return;

        const createPulse = (animatedValue: Animated.Value, delay: number) => {
            return Animated.loop(
                Animated.sequence([
                    Animated.delay(delay),
                    Animated.timing(animatedValue, {
                        toValue: 1.5,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(animatedValue, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ])
            );
        };

        const anim1 = createPulse(dot1, 0);
        const anim2 = createPulse(dot2, 150);
        const anim3 = createPulse(dot3, 300);

        anim1.start();
        anim2.start();
        anim3.start();

        return () => {
            anim1.stop();
            anim2.stop();
            anim3.stop();
        };
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
                {isTyping ? (
                    <View style={styles.dotContainer}>
                        <Animated.View
                            style={[
                                styles.dot,
                                { transform: [{ scale: dot1 }] },
                            ]}
                        />
                        <Animated.View
                            style={[
                                styles.dot,
                                { transform: [{ scale: dot2 }] },
                            ]}
                        />
                        <Animated.View
                            style={[
                                styles.dot,
                                { transform: [{ scale: dot3 }] },
                            ]}
                        />
                    </View>
                ) : (
                    <ThemedText type="body2">{text}</ThemedText>
                )}
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
    dotContainer: {
        flexDirection: "row",
        gap: 6,
        alignItems: "center",
        justifyContent: "center",
        height: 18,
        paddingHorizontal: 2,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#555", // 원한다면 Colors.gray1 등으로 변경 가능
    },
});
