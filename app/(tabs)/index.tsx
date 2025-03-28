import PageLayout from "@/components/common/PageLayout";
import Titled from "@/components/common/Titled";
import FriendList from "@/components/friend/FriendList";
import AddLogItem from "@/components/logs/AddLogItem";
import LogItem from "@/components/logs/LogItem";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
    const [opendOptionId, setOpendOptionId] = useState<number | null>(null);
    const logs = [
        {
            id: 1,
            imageUrl: "https://placehold.co/400",
            title: "서울 여행",
            startDate: new Date(),
            endDate: new Date(),
            description: "서울 여행을 다녀왔습니다.",
        },
        {
            id: 2,
            imageUrl: "https://placehold.co/400",
            title: "부산 여행",
            startDate: new Date(),
            endDate: new Date(),
            description: "부산 여행을 다녀왔습니다.",
        },
    ];

    const handleOptionPress = (id: number) => {
        setOpendOptionId((prev) => (prev === id ? null : id));
    };

    return (
        <PageLayout headerTitle="Memozy" titleAlign="left" style={{ gap: 20 }}>
            <Titled title="Friends">
                <FriendList
                    friends={[
                        "https://example.com/image1.jpg",
                        "https://example.com/image2.jpg",
                        "https://example.com/image3.jpg",
                    ]}
                    onAddFriend={() => {
                        console.log("Add friend pressed");
                    }}
                />
            </Titled>
            <Titled title="Recents" gap={20}>
                <AddLogItem />
                {logs.map((log) => (
                    <LogItem
                        key={log.id}
                        id={log.id}
                        imageUrl={log.imageUrl}
                        title={log.title}
                        startDate={log.startDate}
                        endDate={log.endDate}
                        description={log.description}
                        onOptionPress={() => handleOptionPress(log.id)}
                        isOptionOpen={opendOptionId === log.id}
                    />
                ))}
            </Titled>
        </PageLayout>
    );
}

const styles = StyleSheet.create({});
