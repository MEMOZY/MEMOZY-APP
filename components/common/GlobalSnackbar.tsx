import { useUI } from "@/hooks/useUI";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/Colors";

export const GlobalSnackbar = () => {
    const { snackbar, hideSnackbar } = useUI();
    const translateY = useRef(new Animated.Value(100)).current;

    useEffect(() => {
        Animated.spring(translateY, {
            toValue: snackbar.visible ? 0 : 100,
            useNativeDriver: true,
        }).start();
    }, [snackbar.visible]);

    if (!snackbar.visible) return null;

    return (
        <Animated.View
            style={[styles.container, { transform: [{ translateY }] }]}
        >
            <View
                style={[
                    styles.verticalLine,
                    { backgroundColor: snackbar.color || Colors.gray4 },
                ]}
            />
            <ThemedText type="body1b">{snackbar.message}</ThemedText>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 40,
        alignSelf: "center",
        backgroundColor: Colors.gray1,
        height: 58,
        width: "90%",
        borderRadius: 12,
        boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 12,
        gap: 20,
        zIndex: 1000,
        flexDirection: "row",
    },

    verticalLine: {
        width: 2,
        height: "100%",
    },
});
