import { Colors } from "@/constants/Colors";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../common/ThemedText";
import { deleteMemory, getMemories } from "@/api/memory";
import { router } from "expo-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface LogOptionsProps {
    memoryId: number;
    setSelectedLog: (logId: number | null) => void;
}

export default function LogOptions({
    memoryId,
    setSelectedLog,
}: LogOptionsProps) {
    const queryClient = useQueryClient();
    return (
        <View style={styles.container}>
            {/* <TouchableOpacity
                onPress={() => {
                    console.log("Edit pressed");
                }}
            >
                <ThemedText
                    type="body2"
                    lightColor={Colors.light.tabIconSelected}
                    darkColor={Colors.dark.tabIconSelected}
                >
                    수정
                </ThemedText>
            </TouchableOpacity>
            <View style={styles.line} /> */}
            <TouchableOpacity
                onPress={async () => {
                    await deleteMemory(memoryId);
                    await queryClient.invalidateQueries({
                        queryKey: ["memories"],
                    });
                    setSelectedLog(null);
                }}
            >
                <ThemedText
                    type="body2"
                    lightColor={Colors.red}
                    darkColor={Colors.red}
                >
                    삭제
                </ThemedText>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "space-between",
        width: 70,
        backgroundColor: Colors.white,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: 12,
        gap: 10,
        padding: 10,
        position: "absolute",
        right: 0,
        top: 30,
        zIndex: 1,
    },
    line: {
        height: 1,
        width: "100%",
        backgroundColor: Colors.gray3,
    },
});
