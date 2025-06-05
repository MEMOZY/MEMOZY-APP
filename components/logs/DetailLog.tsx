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
import { Memory } from "@/api/memory";
import { formatDateRange } from "@/utils/formatDate";
import { useEffect, useState } from "react";
import LogOptions from "./LogOptions";

interface DetailLogProps {
    onBackPress: () => void;
    memory: Memory;
}

export default function DetailLog({ onBackPress, memory }: DetailLogProps) {
    const [isOptionOpen, setIsOptionOpen] = useState(false);

    useEffect(() => {
        if (!memory) {
            onBackPress();
        }
    }, [memory]);

    if (!memory) return null;

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
                                setSelectedLog={() => {}}
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
                    {memory.sharedUserIds.length > 0 && (
                        <View
                            style={{
                                gap: 10,
                                flexDirection: "row",
                                flexWrap: "wrap",
                            }}
                        >
                            {memory.sharedUserIds.map((userId) => (
                                <View
                                    key={userId}
                                    style={{
                                        backgroundColor: Colors.gray3,
                                        borderRadius: 8,
                                        paddingHorizontal: 6,
                                        alignSelf: "flex-start",
                                    }}
                                >
                                    <ThemedText
                                        type="caption"
                                        lightColor={Colors.gray6}
                                        darkColor={Colors.gray6}
                                    >
                                        {userId}
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

const styles = StyleSheet.create({});
