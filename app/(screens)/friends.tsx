import {
    Friend,
    getFriends,
    getReceivedFriendRequests,
    getSentFriendRequests,
} from "@/api/friend";
import PageLayout from "@/components/common/PageLayout";
import { ThemedText } from "@/components/common/ThemedText";
import EmptyList from "@/components/friend/EmptyList";
import { FriendItem } from "@/components/friend/FriendItem";
import { FriendSearchBar } from "@/components/friend/FriendSearchBar";
import { ReceivedFriendItem } from "@/components/friend/ReceivedFriendItem";
import { RequestFriendItem } from "@/components/friend/RequestFriendItem";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";

const tabs = ["친구 목록", "보낸 요청", "받은 요청"] as const;
type TabType = (typeof tabs)[number];

export default function FriendsScreen() {
    const [selectedTab, setSelectedTab] = useState<TabType>("친구 목록");
    const [friends, setFriends] = useState<Friend[]>([]);
    const [receivedRequests, setReceivedRequests] = useState<Friend[]>([]);
    const [sentRequests, setSentRequests] = useState<Friend[]>([]);

    const fetchFriends = async () => {
        try {
            const friendsList = await getFriends();
            const receivedRequestsList = await getReceivedFriendRequests();
            const sentRequestsList = await getSentFriendRequests();
            setFriends(friendsList);
            setReceivedRequests(receivedRequestsList);
            setSentRequests(sentRequestsList);
        } catch (error) {
            console.error("Error fetching friends:", error);
        }
    };

    useEffect(() => {
        fetchFriends();
    }, []);

    const renderTabContent = () => {
        switch (selectedTab) {
            case "친구 목록":
                return friends.length > 0 ? (
                    friends.map((friend) => (
                        <FriendItem
                            key={friend.userId}
                            name={friend.nickname}
                            imageUrl={friend.profileImageUrl}
                            userId={friend.userId}
                        />
                    ))
                ) : (
                    <EmptyList text="아직 추가한 친구가 없어요." />
                );
            case "보낸 요청":
                return sentRequests.length > 0 ? (
                    sentRequests.map((friend) => (
                        <ReceivedFriendItem
                            key={friend.userId}
                            name={friend.nickname}
                            imageUrl={friend.profileImageUrl}
                            userId={friend.userId}
                        />
                    ))
                ) : (
                    <EmptyList text="보낸 친구 요청이 없어요." />
                );
            case "받은 요청":
                return receivedRequests.length > 0 ? (
                    receivedRequests.map((friend) => (
                        <RequestFriendItem
                            key={friend.userId}
                            name={friend.nickname}
                            imageUrl={friend.profileImageUrl}
                            userId={friend.userId}
                        />
                    ))
                ) : (
                    <EmptyList text="받은 친구 요청이 없어요." />
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
