import { ThemedSafeView } from "@/components/common/ThemedSafeView";
import { StyleSheet, useColorScheme, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { BackIcon } from "@/assets/images/icons";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

interface PageLayoutProps {
    children?: React.ReactNode;
    style?: object;
    headerTitle?: string;
    titleAlign?: "left" | "center";
    hasBack?: boolean;
    backText?: string;
}

export default function PageLayout({
    children,
    style,
    headerTitle,
    titleAlign = "center",
    hasBack = false,
    backText,
}: PageLayoutProps) {
    return (
        <ThemedSafeView style={styles.container}>
            {(headerTitle || hasBack) && (
                <View style={styles.headerContainer}>
                    {hasBack && (
                        <View style={styles.backContainer}>
                            <BackIcon onPress={() => router.back()} />
                            {backText && (
                                <ThemedText
                                    type="caption"
                                    style={styles.backText}
                                    darkColor={Colors.dark.tabIconDefault}
                                    lightColor={Colors.light.tabIconDefault}
                                >
                                    {backText}
                                </ThemedText>
                            )}
                        </View>
                    )}

                    {headerTitle && (
                        <ThemedText
                            type="title"
                            style={[
                                styles.headerTitle,
                                titleAlign === "left" &&
                                    hasBack && {
                                        textAlign: "left",
                                        marginLeft: hasBack ? 10 : 0,
                                    },
                                titleAlign === "center" &&
                                    hasBack && {
                                        textAlign: "center",
                                        marginLeft: -24,
                                    },
                            ]}
                        >
                            {headerTitle}
                        </ThemedText>
                    )}
                </View>
            )}

            {/* Body */}
            <View style={[styles.body, style]}>{children}</View>
        </ThemedSafeView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    backContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    backText: {
        marginLeft: 5,
    },
    headerTitle: {
        flex: 1,
        textAlign: "center",
    },
    body: {
        flex: 1,
        width: "100%",
        paddingHorizontal: 30,
    },
});
