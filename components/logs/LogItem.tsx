import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../common/ThemedText";
import { DotsIcon } from "@/assets/images/icons";
import { formatDate, formatDateRange } from "@/utils/formatDate";
import { Colors } from "@/constants/Colors";
import { memo, useState } from "react";
import LogOptions from "./LogOptions";

interface LogItemProps {
    id: number;
    imageUrl: string;
    title: string;
    startDate: Date;
    endDate: Date;
    description: string;
    isOptionOpen?: boolean;
    onOptionPress?: () => void;
}

function LogItem({
    id,
    imageUrl,
    title,
    startDate,
    endDate,
    description,
    isOptionOpen = false,
    onOptionPress = () => {},
}: LogItemProps) {
    const range =
        startDate === endDate
            ? formatDate(startDate)
            : formatDateRange(startDate, endDate);
    return (
        <View style={styles.logContainer}>
            <View style={styles.logHeader}>
                <ThemedText type="body2b">{title}</ThemedText>
                <TouchableOpacity onPress={onOptionPress}>
                    <DotsIcon />
                </TouchableOpacity>
                {isOptionOpen && <LogOptions onOptionPress={onOptionPress} />}
            </View>
            <ThemedText
                type="caption"
                lightColor={Colors.light.tabIconDefault}
                darkColor={Colors.dark.tabIconDefault}
            >
                {range}
            </ThemedText>
            <View style={styles.logBody}>
                <Image source={{ uri: imageUrl }} style={styles.logImage} />
                <ThemedText type="body2" style={{ flex: 1 }}>
                    {description}
                </ThemedText>
            </View>
        </View>
    );
}

export default memo(LogItem);

const styles = StyleSheet.create({
    logContainer: {
        gap: 10,
        backgroundColor: Colors.white,
        padding: 12,
        borderRadius: 12,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    },
    logHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    logBody: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    logImage: {
        width: 70,
        height: 70,
        borderRadius: 8,
        backgroundColor: Colors.gray3,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.05)",
    },
});
