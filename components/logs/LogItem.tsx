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
    setSelectedLog: (logId: number | null) => void;
}

function LogItem({
    id,
    imageUrl,
    title,
    startDate,
    endDate,
    description,
    setSelectedLog,
}: LogItemProps) {
    const range =
        startDate === endDate
            ? formatDate(startDate)
            : formatDateRange(startDate, endDate);

    const [isOptionOpen, setIsOptionOpen] = useState(false);
    return (
        <View style={styles.logContainer}>
            <View style={styles.logHeader}>
                <ThemedText type="body2b">{title}</ThemedText>
                {isOptionOpen && (
                    <LogOptions memoryId={id} setSelectedLog={setSelectedLog} />
                )}
                <TouchableOpacity
                    onPress={() => setIsOptionOpen(!isOptionOpen)}
                >
                    <DotsIcon />
                </TouchableOpacity>
            </View>
            <ThemedText
                type="caption"
                lightColor={Colors.light.tabIconDefault}
                darkColor={Colors.dark.tabIconDefault}
            >
                {range}
            </ThemedText>
            <TouchableOpacity onPress={() => setSelectedLog(id)}>
                <View style={styles.logBody}>
                    <Image source={{ uri: imageUrl }} style={styles.logImage} />
                    <ThemedText type="body2" style={styles.flex}>
                        {description}
                    </ThemedText>
                </View>
            </TouchableOpacity>
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
    flex: {
        maxHeight: 70,
        flex: 1,
    },
});
