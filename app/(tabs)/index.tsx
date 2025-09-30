import { getFriends } from "@/api/friend";
import { getMemories, MemoryThumbnail } from "@/api/memory";
import PageLayout from "@/components/common/PageLayout";
import Titled from "@/components/common/Titled";
import FriendList from "@/components/friend/FriendList";
import AddLogItem from "@/components/logs/AddLogItem";
import DetailLog from "@/components/logs/DetailLog";
import LogItem from "@/components/logs/LogItem";
import { SearchBar } from "@/components/search/SearchBar";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
    const [selectedLog, setSelectedLog] = useState<number | null>(null);
    const {
        data,
        isLoading,
        isFetching,
        isFetchingNextPage,
        isRefetching,
        error,
        refetch: refetchMemory,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ["memories"],
        initialPageParam: 0,
        queryFn: async ({ pageParam }) =>
            getMemories({
                page: (pageParam as number) ?? 0,
                size: 10,
            }),
        getNextPageParam: (lastPage) =>
            lastPage.last ? undefined : lastPage.page + 1,
    });

    const memories: MemoryThumbnail[] = useMemo(
        () => data?.pages.flatMap((p) => p.content) ?? [],
        [data]
    );

    const { data: friends, refetch: refetchFriends } = useQuery({
        queryKey: ["friends"],
        queryFn: getFriends,
    });

    return selectedLog && memories ? (
        <DetailLog
            onBackPress={() => {
                setSelectedLog(null);
            }}
            memoryId={selectedLog}
        />
    ) : (
        <PageLayout
            headerTitle="Memozy"
            titleAlign="left"
            style={{ gap: 20, paddingBottom: 60 }}
            scrollView
            onRefresh={async () => {
                refetchMemory();
                refetchFriends();
            }}
            onEndReached={() => {
                if (hasNextPage && !isFetchingNextPage && !isFetching) {
                    fetchNextPage();
                }
            }}
        >
            <SearchBar
                onSearch={({ keyword, mode }) => {
                    router.push({
                        pathname: "/(screens)/search",
                        params: { keyword, mode },
                    });
                }}
            />

            <Titled title="Friends">
                <FriendList
                    friends={friends ?? []}
                    onAddFriend={() => {
                        router.push("/(screens)/friends");
                    }}
                />
            </Titled>

            <Titled title="Recents" gap={20}>
                <AddLogItem />
                {!isLoading &&
                    memories &&
                    memories.length > 0 &&
                    memories.map((log) => (
                        <LogItem
                            key={log.id}
                            id={log.id}
                            imageUrl={log.thumbnailUrl}
                            title={log.title}
                            startDate={new Date(log.startDate)}
                            endDate={new Date(log.endDate)}
                            description={log.content}
                            setSelectedLog={setSelectedLog}
                        />
                    ))}
            </Titled>
        </PageLayout>
    );
}

const styles = StyleSheet.create({});
