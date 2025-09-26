import { Image, StyleSheet, TextInput, View } from "react-native";
import { ThemedText } from "../common/ThemedText";
import { TrashIcon } from "@/assets/images/icons";
import { Colors } from "@/constants/Colors";

interface LogCardProps {
    imageUrl?: string;
    text?: string;
    onChangeText?: (text: string) => void;
    onDelete: () => void;
    editable?: boolean;
}

export default function LogCard({
    imageUrl,
    text,
    onChangeText,
    onDelete,
    editable = false,
}: LogCardProps) {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: imageUrl || "https://example.com/image.jpg" }}
                style={styles.image}
                resizeMode="contain"
            />
            {editable ? (
                <TextInput
                    style={styles.body1}
                    value={text}
                    onChangeText={onChangeText}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="off"
                    autoFocus={false}
                    returnKeyType="done"
                    inputMode="text"
                />
            ) : (
                <ThemedText type="body1">{text}</ThemedText>
            )}
            <View style={styles.footer}>
                <TrashIcon onPress={onDelete} />
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
        justifyContent: "flex-end",
        alignItems: "center",
    },
    body1: {
        fontSize: 16,
        fontFamily: "Pretendard-Regular",
    },
});
