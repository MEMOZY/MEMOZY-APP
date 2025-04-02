import { Image, StyleSheet, View } from "react-native";
import { ThemedText } from "../common/ThemedText";
import { TrashIcon } from "@/assets/images/icons";
import { Colors } from "@/constants/Colors";
import { formatTime } from "@/utils/formatDate";

interface LogCardProps {
    imageUrl?: string;
    text?: string;
    time: Date;
}

export default function LogCard({ imageUrl, text, time }: LogCardProps) {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: imageUrl || "https://example.com/image.jpg" }}
                style={styles.image}
                resizeMode="contain"
            />
            <ThemedText type="body1">{text}</ThemedText>
            <View style={styles.footer}>
                <ThemedText
                    type="body2"
                    lightColor={Colors.gray4}
                    darkColor={Colors.gray4}
                >
                    {formatTime(time)}
                </ThemedText>
                <TrashIcon />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        width: "100%",
        borderRadius: 12,
        padding: 20,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        gap: 10,
    },
    image: {
        width: "100%",
        minHeight: 120,
        backgroundColor: Colors.gray2,
        borderRadius: 10,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});
