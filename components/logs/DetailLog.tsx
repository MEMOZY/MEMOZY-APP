import PageLayout from "@/components/common/PageLayout";
import {
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { ThemedText } from "../common/ThemedText";
import { DotsIcon } from "@/assets/images/icons";
import { Colors } from "@/constants/Colors";
import { getMemory } from "@/api/memory";
import { formatDateRange } from "@/utils/formatDate";
import { useEffect, useState } from "react";
import LogOptions from "./LogOptions";
import LogEdit from "./LogEdit";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface DetailLogProps {
    onBackPress: () => void;
    memoryId: number;
}

export default function DetailLog({ onBackPress, memoryId }: DetailLogProps) {
    const [isOptionOpen, setIsOptionOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const queryClient = useQueryClient();
    const { data } = useQuery({
        queryKey: ["memory", memoryId],
        queryFn: () => getMemory(memoryId),
    });

    useEffect(() => {
        if (!memoryId) {
            onBackPress();
        }
    }, [memoryId]);

    const memory = data?.memoryDetails;

    if (!memory) return null;

    if (isEditOpen) {
        return (
            <LogEdit
                initialMemory={memory}
                onBack={() => {
                    setIsEditOpen(false);
                    queryClient.invalidateQueries({
                        queryKey: ["memory", memoryId],
                    });
                }}
            />
        );
    }

    return (
        <PageLayout
            padding={10}
            style={{
                margin: 0,
                padding: 0,
            }}
            containerStyle={{
                padding: 0,
                margin: 0,
            }}
        >
            <PageLayout
                padding={20}
                containerStyle={{
                    backgroundColor: "white",
                    borderRadius: 12,
                    paddingVertical: 0,
                    marginBottom: 30,
                    paddingTop: 20,
                    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)",
                }}
                safeArea={false}
                hasBack
                onBack={onBackPress}
                backText="이전"
                headerTitle={memory.title}
                titleAlign="left"
                headerRight={
                    <>
                        {isOptionOpen && (
                            <LogOptions
                                memoryId={memory.id}
                                onEdit={
                                    data?.canEdit
                                        ? () => {
                                              setIsOptionOpen(false);
                                              setIsEditOpen(true);
                                          }
                                        : undefined
                                }
                                onDelete={() => {
                                    setIsOptionOpen(false);
                                    onBackPress();
                                }}
                            />
                        )}
                        <TouchableOpacity
                            onPress={() => setIsOptionOpen(!isOptionOpen)}
                        >
                            <DotsIcon />
                        </TouchableOpacity>
                    </>
                }
                style={{
                    gap: 20,
                }}
            >
                <View style={{ gap: 10 }}>
                    <ThemedText
                        type="body2b"
                        lightColor={Colors.gray4}
                        darkColor={Colors.gray4}
                    >
                        {formatDateRange(
                            new Date(memory.startDate),
                            new Date(memory.endDate)
                        )}
                    </ThemedText>
                    {memory.accessInfos.length > 0 && (
                        <View
                            style={{
                                gap: 10,
                                flexDirection: "row",
                                flexWrap: "wrap",
                            }}
                        >
                            {memory.accessInfos.map((accessInfo) => (
                                <View
                                    key={accessInfo.userId}
                                    style={[
                                        styles.userBadge,
                                        accessInfo.permissionLevel === "EDITOR"
                                            ? styles.permBoth
                                            : accessInfo.permissionLevel ===
                                              "OWNER"
                                            ? styles.permOwn
                                            : styles.permRead,
                                    ]}
                                >
                                    <ThemedText
                                        type="caption"
                                        lightColor={Colors.gray6}
                                        darkColor={Colors.gray6}
                                    >
                                        {accessInfo.nickname}
                                    </ThemedText>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
                <ScrollView
                    style={{
                        flex: 1,
                    }}
                    contentContainerStyle={{
                        gap: 20,
                        padding: 20,
                    }}
                >
                    {memory.memoryItems.map((item) => (
                        <View
                            style={{ gap: 12, alignItems: "center" }}
                            key={item.sequence}
                        >
                            <Image
                                source={{
                                    uri: item.imageUrl,
                                }}
                                style={{
                                    width: 200,
                                    height: 200,
                                    backgroundColor: Colors.gray3,
                                    borderRadius: 12,
                                }}
                            />
                            {item.content.split(". ").map((line, index) => (
                                <ThemedText
                                    type="body1"
                                    lightColor={Colors.gray6}
                                    darkColor={Colors.gray6}
                                    style={{
                                        alignSelf: "flex-start",
                                    }}
                                    key={index}
                                >
                                    {line +
                                        (index <
                                        item.content.split(". ").length - 1
                                            ? ". "
                                            : "")}
                                </ThemedText>
                            ))}
                        </View>
                    ))}
                </ScrollView>
            </PageLayout>
        </PageLayout>
    );
}

const styles = StyleSheet.create({
    userBadge: {
        paddingHorizontal: 8,
        height: 20,
        minWidth: 34,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 999,
        borderWidth: 1,
    },
    permText: { fontSize: 10, fontWeight: "600", color: "#111" },
    permNone: { backgroundColor: "#eee", borderColor: "#ddd" },
    permOwn: { backgroundColor: "#5E83E9", borderColor: "#335DD6" },
    permRead: { backgroundColor: "#E8F3FF", borderColor: "#BBD8FF" },
    permBoth: { backgroundColor: "#E9FFE8", borderColor: "#C7F7C4" },
});
