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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";

const tabs = ["친구 목록", "보낸 요청", "받은 요청"] as const;
type TabType = (typeof tabs)[number];

export default function FriendsScreen() {
    const [selectedTab, setSelectedTab] = useState<TabType>("친구 목록");

    const [friends, setFriends] = useState<Friend[]>([]);
    const [receivedRequests, setReceivedRequests] = useState<Friend[]>([]);
    const [sentRequests, setSentRequests] = useState<Friend[]>([]);

    const queryClient = useQueryClient();

    const fetchAll = useCallback(async () => {
        try {
            const [f, r, s] = await Promise.all([
                getFriends(),
                getReceivedFriendRequests(),
                getSentFriendRequests(),
            ]);
            setFriends(f);
            setReceivedRequests(r);
            setSentRequests(s);
        } catch (e) {
            console.warn("fetchAll error", e);
        } finally {
            queryClient.invalidateQueries({
                queryKey: ["friends"],
            });
        }
    }, []);

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    const renderTabContent = () => {
        if (!friends || !sentRequests || !receivedRequests) {
            return <EmptyList text="정보를 불러오는 중이에요." />;
        }

        const renderList = (
            data: any[],
            EmptyText: string,
            Component: React.ElementType
        ) => {
            return data.length > 0 ? (
                data.map((friend) => (
                    <Component
                        key={friend.userId}
                        name={friend.nickname}
                        imageUrl={friend.profileImageUrl}
                        userId={friend.userId}
                        fetchAll={() => fetchAll()}
                    />
                ))
            ) : (
                <EmptyList text={EmptyText} />
            );
        };

        switch (selectedTab) {
            case "친구 목록":
                return renderList(
                    friends,
                    "아직 추가한 친구가 없어요.",
                    FriendItem
                );
            case "보낸 요청":
                return renderList(
                    sentRequests,
                    "보낸 친구 요청이 없어요.",
                    ReceivedFriendItem
                );
            case "받은 요청":
                return renderList(
                    receivedRequests,
                    "받은 친구 요청이 없어요.",
                    RequestFriendItem
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
            <FriendSearchBar fetchAll={fetchAll} />
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
