import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
    lightColor?: string;
    darkColor?: string;
    type?:
        | "title"
        | "body1b"
        | "body1"
        | "body2b"
        | "body2"
        | "caption"
        | "captions";
};

export function ThemedText({
    style,
    lightColor,
    darkColor,
    type = "body1",
    ...rest
}: ThemedTextProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

    return (
        <Text
            style={[
                { color },
                type === "title" ? styles.title : undefined,
                type === "body1b" ? styles.body1b : undefined,
                type === "body1" ? styles.body1 : undefined,
                type === "body2b" ? styles.body2b : undefined,
                type === "body2" ? styles.body2 : undefined,
                type === "caption" ? styles.caption : undefined,
                type === "captions" ? styles.captions : undefined,
                style,
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontFamily: "Pretendard-Bold",
    },
    body1b: {
        fontSize: 16,
        fontFamily: "Pretendard-SemiBold",
    },
    body1: {
        fontSize: 16,
        fontFamily: "Pretendard-Regular",
    },
    body2b: {
        fontSize: 13,
        fontFamily: "Pretendard-SemiBold",
    },
    body2: {
        fontSize: 13,
        fontFamily: "Pretendard-Regular",
    },
    caption: {
        fontSize: 12,
        fontFamily: "Pretendard-Regular",
    },
    captions: {
        fontSize: 10,
        fontFamily: "Pretendard-Regular",
    },
});
