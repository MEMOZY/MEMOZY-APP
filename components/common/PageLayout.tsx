import { ThemedSafeView } from "@/components/common/ThemedSafeView";
import { ScrollView, StyleSheet, View, RefreshControl } from "react-native";
import { ThemedText } from "./ThemedText";
import { BackIcon } from "@/assets/images/icons";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { useState } from "react";

interface PageLayoutProps {
    children?: React.ReactNode;
    style?: object;
    headerTitle?: string;
    titleAlign?: "left" | "center";
    hasBack?: boolean;
    backText?: string;
    headerRight?: React.ReactNode;
    scrollView?: boolean;
    onRefresh?: () => Promise<void>; // 추가된 prop
}

export default function PageLayout({
    children,
    style,
    headerTitle,
    titleAlign = "center",
    hasBack = false,
    backText,
    headerRight,
    scrollView = false,
    onRefresh, // 새로고침 핸들러
}: PageLayoutProps) {
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        if (onRefresh) {
            setRefreshing(true);
            await onRefresh();
            setRefreshing(false);
        }
    };

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
                                titleAlign === "left" &&
                                    !hasBack && {
                                        textAlign: "left",
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

                    {headerRight && (
                        <View style={{ flex: 1, alignItems: "flex-end" }}>
                            {headerRight}
                        </View>
                    )}
                </View>
            )}

            {/* Body */}
            {scrollView ? (
                <ScrollView
                    style={[styles.body]}
                    contentContainerStyle={style}
                    refreshControl={
                        onRefresh && (
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={handleRefresh}
                                colors={[Colors.gray2]}
                                tintColor={Colors.gray3}
                            />
                        )
                    }
                >
                    {children}
                </ScrollView>
            ) : (
                <View style={[styles.body, style]}>{children}</View>
            )}
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
        paddingBottom: 20,
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
