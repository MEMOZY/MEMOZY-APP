import { Colors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../common/ThemedText";

interface EmptyListProps {
    text: string;
}

export default function EmptyList({ text }: EmptyListProps) {
    return (
        <View style={styles.container}>
            <ThemedText
                type="body1b"
                lightColor={Colors.gray4}
                darkColor={Colors.gray4}
            >
                {text}
            </ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.gray2,
        padding: 20,
        borderRadius: 12,
    },
});
