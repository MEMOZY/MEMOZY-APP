import { getMemories, Memory } from "@/api/memory";
import PageLayout from "@/components/common/PageLayout";
import Titled from "@/components/common/Titled";
import FriendList from "@/components/friend/FriendList";
import AddLogItem from "@/components/logs/AddLogItem";
import DetailLog from "@/components/logs/DetailLog";
import LogItem from "@/components/logs/LogItem";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
    const [opendOptionId, setOpendOptionId] = useState<number | null>(null);
    const [selectedLog, setSelectedLog] = useState<number | null>(null);
    const [memories, setMemories] = useState<Memory[]>([]);

    useEffect(() => {
        const fetchMemories = async () => {
            try {
                const data = await getMemories();
                setMemories(data.memories);
            } catch (error) {
                console.error("Error fetching memories:", error);
            }
        };
        fetchMemories();
    }, []);

    const handleOptionPress = (id: number) => {
        setOpendOptionId((prev) => (prev === id ? null : id));
    };

    return selectedLog ? (
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
                try {
                    const data = await getMemories();
                    setMemories(data.memories);
                } catch (error) {
                    console.error("Error fetching memories:", error);
                }
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
                {memories.length > 0 &&
                    memories.map((log) => (
                        <LogItem
                            key={log.id}
                            id={log.id}
                            imageUrl={log.memoryItems[0].imageUrl}
                            title={log.title}
                            startDate={new Date(log.startDate)}
                            endDate={new Date(log.endDate)}
                            description={log.memoryItems[0].content}
                            onOptionPress={() => handleOptionPress(log.id)}
                            isOptionOpen={opendOptionId === log.id}
                            onPress={() => {
                                setSelectedLog(log.id);
                            }}
                        />
                    ))}
            </Titled>
        </PageLayout>
    );
}

const styles = StyleSheet.create({});
