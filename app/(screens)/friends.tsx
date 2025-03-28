import PageLayout from "@/components/common/PageLayout";
import { ThemedText } from "@/components/common/ThemedText";
import EmptyList from "@/components/friend/EmptyList";
import { FriendItem } from "@/components/friend/FriendItem";
import { FriendSearchBar } from "@/components/friend/FriendSearchBar";
import { ReceivedFriendItem } from "@/components/friend/ReceivedFriendItem";
import { RequestFriendItem } from "@/components/friend/RequestFriendItem";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";

const tabs = ["친구 목록", "보낸 요청", "받은 요청"] as const;
type TabType = (typeof tabs)[number];

export default function FriendsScreen() {
    const [selectedTab, setSelectedTab] = useState<TabType>("친구 목록");

    const renderTabContent = () => {
        switch (selectedTab) {
            case "친구 목록":
                return (
                    <FriendItem
                        name="홍길동"
                        imageUrl="https://example.com/friend.jpg"
                        onSwipeLeft={() => {
                            console.log("삭제 수행");
                        }}
                    />
                );
            case "보낸 요청":
                return (
                    <ReceivedFriendItem
                        name="홍길동"
                        imageUrl="https://example.com/friend.jpg"
                    />
                );
            case "받은 요청":
                return (
                    <RequestFriendItem
                        name="홍길동"
                        imageUrl="https://example.com/friend.jpg"
                    />
                );
            default:
                return null;
        }
    };

    return (
        <PageLayout
            headerTitle="Friends"
            titleAlign="left"
            hasBack
            style={{ gap: 20 }}
        >
            <FriendSearchBar />
            <View style={{ gap: 20 }}>
                <View style={{ flexDirection: "row", gap: 12 }}>
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setSelectedTab(tab)}
                            style={{
                                borderBottomWidth: selectedTab === tab ? 2 : 0,
                                borderBottomColor: Colors.gray6,
                                paddingBottom: 4,
                            }}
                        >
                            <ThemedText
                                type="title"
                                lightColor={
                                    selectedTab === tab
                                        ? Colors.gray6
                                        : Colors.gray4
                                }
                                darkColor={
                                    selectedTab === tab
                                        ? Colors.gray6
                                        : Colors.gray4
                                }
                            >
                                {tab}
                            </ThemedText>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={{ gap: 10 }}>{renderTabContent()}</View>
            </View>
        </PageLayout>
    );
}
