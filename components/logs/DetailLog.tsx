import PageLayout from "@/components/common/PageLayout";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "../common/ThemedText";
import { DotsIcon } from "@/assets/images/icons";
import { Colors } from "@/constants/Colors";

export default function DetailLog() {
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
                    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)",
                }}
                hasBack
                backText="이전"
                headerTitle="기록 상세"
                headerRight={<DotsIcon />}
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
                        3월 21일 (금) - 3월 26일 (수)
                    </ThemedText>
                    <View
                        style={{
                            gap: 10,
                            flexDirection: "row",
                            flexWrap: "wrap",
                        }}
                    >
                        <View
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
                                seokkkk
                            </ThemedText>
                        </View>
                        <View
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
                                gaguriee
                            </ThemedText>
                        </View>
                    </View>
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
                    <View style={{ gap: 12, alignItems: "center" }}>
                        <Image
                            source={{
                                uri: "https://example.com/image.jpg",
                            }}
                            style={{
                                width: 200,
                                height: 200,
                                backgroundColor: Colors.gray3,
                                borderRadius: 12,
                            }}
                        />
                        <ThemedText
                            type="body1"
                            lightColor={Colors.gray6}
                            darkColor={Colors.gray6}
                        >
                            나는 21일 서울에 올라갔다. 처음 간 곳은 한강! 날씨도
                            따뜻하고 너무 좋았다~나는 21일 서울에 올라갔다. 처음
                            간 곳은 한강! 날씨도 따뜻하고 너무 좋았다~
                        </ThemedText>
                    </View>
                    <View style={{ gap: 12, alignItems: "center" }}>
                        <Image
                            source={{
                                uri: "https://example.com/image.jpg",
                            }}
                            style={{
                                width: 200,
                                height: 200,
                                backgroundColor: Colors.gray3,
                                borderRadius: 12,
                            }}
                        />
                        <ThemedText
                            type="body1"
                            lightColor={Colors.gray6}
                            darkColor={Colors.gray6}
                        >
                            나는 21일 서울에 올라갔다. 처음 간 곳은 한강! 날씨도
                            따뜻하고 너무 좋았다~나는 21일 서울에 올라갔다. 처음
                            간 곳은 한강! 날씨도 따뜻하고 너무 좋았다~
                        </ThemedText>
                    </View>
                    <View style={{ gap: 12, alignItems: "center" }}>
                        <Image
                            source={{
                                uri: "https://example.com/image.jpg",
                            }}
                            style={{
                                width: 200,
                                height: 200,
                                backgroundColor: Colors.gray3,
                                borderRadius: 12,
                            }}
                        />
                        <ThemedText
                            type="body1"
                            lightColor={Colors.gray6}
                            darkColor={Colors.gray6}
                        >
                            나는 21일 서울에 올라갔다. 처음 간 곳은 한강! 날씨도
                            따뜻하고 너무 좋았다~나는 21일 서울에 올라갔다. 처음
                            간 곳은 한강! 날씨도 따뜻하고 너무 좋았다~
                        </ThemedText>
                    </View>
                </ScrollView>
            </PageLayout>
        </PageLayout>
    );
}

const styles = StyleSheet.create({});
