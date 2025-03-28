import { StyleSheet, View } from "react-native";
import { ThemedText } from "../common/ThemedText";
import { Colors } from "react-native/Libraries/NewAppScreen";
import AddLogButton from "./AddLogButton";
import { formatDate } from "@/utils/formatDate";
import { memo } from "react";

function AddLogItem() {
    const today = formatDate(new Date());
    return (
        <View style={styles.logContainer}>
            <View style={styles.logHeader}>
                <ThemedText type="body2b">오늘</ThemedText>
            </View>
            <ThemedText
                type="caption"
                lightColor={Colors.light.tabIconDefault}
                darkColor={Colors.dark.tabIconDefault}
            >
                {today}
            </ThemedText>
            <AddLogButton />
        </View>
    );
}

export default memo(AddLogItem);

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
});
