import { getMemories, Memory } from "@/api/memory";
import PageLayout from "@/components/common/PageLayout";
import Titled from "@/components/common/Titled";
import FriendList from "@/components/friend/FriendList";
import AddLogItem from "@/components/logs/AddLogItem";
import DetailLog from "@/components/logs/DetailLog";
import LogItem from "@/components/logs/LogItem";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
    const [selectedLog, setSelectedLog] = useState<number | null>(null);
    const {
        data: memories,
        isLoading,
        refetch: refetchMemory,
    } = useQuery({
        queryKey: ["memories"],
        queryFn: getMemories,
    });

    return selectedLog && memories ? (
        <DetailLog
            onBackPress={() => {
                setSelectedLog(null);
            }}
            memory={memories.find((log) => log.id === selectedLog)!}
        />
    ) : (
        <PageLayout
            headerTitle="Memozy"
            titleAlign="left"
            style={{ gap: 20 }}
            scrollView
            onRefresh={async () => {
                refetchMemory();
            }}
        >
            <Titled title="Friends">
                <FriendList
                    friends={[]}
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
                            imageUrl={log.memoryItems[0].imageUrl}
                            title={log.title}
                            startDate={new Date(log.startDate)}
                            endDate={new Date(log.endDate)}
                            description={log.memoryItems[0].content}
                            setSelectedLog={setSelectedLog}
                        />
                    ))}
            </Titled>
        </PageLayout>
    );
}

const styles = StyleSheet.create({});
