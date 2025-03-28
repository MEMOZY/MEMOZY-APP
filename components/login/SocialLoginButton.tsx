import { ThemedText } from "@/components/common/ThemedText";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import React from "react";

interface Props {
    icon: React.ReactNode;
    label: string;
    backgroundColor: string;
    textColor?: string;
    onPress?: () => void;
}

export default function SocialLoginButton({
    icon,
    label,
    backgroundColor,
    textColor = "black",
    onPress,
}: Props) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[styles.container, { backgroundColor }]}
        >
            <View style={styles.icon}>{icon}</View>
            <ThemedText type="body1b" style={{ color: textColor }}>
                {label}
            </ThemedText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 48,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 12,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    },
    icon: {
        justifyContent: "center",
        alignItems: "center",
    },
});
