import { getMemories, Memory } from "@/api/memory";
import CalendarDayComponent from "@/components/calendar/CalendarDayComponent";
import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import PageLayout from "@/components/common/PageLayout";
import { ThemedText } from "@/components/common/ThemedText";
import AddLogButton from "@/components/logs/AddLogButton";
import DetailLog from "@/components/logs/DetailLog";
import LogItem from "@/components/logs/LogItem";
import { Colors } from "@/constants/Colors";
import { formatDate } from "@/utils/formatDate";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
    Dimensions,
    Modal,
    Pressable,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { CalendarList } from "react-native-calendars";

export default function CalendarScreen() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedLog, setSelectedLog] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<
        Memory["category"] | null
    >(null);

    const { data: memories, isLoading } = useQuery({
        queryKey: ["memories"],
        queryFn: getMemories,
    });

    const handleDayPress = (day: string) => {
        setSelectedDate(new Date(day));
        setModalVisible(true);
    };

    const filteredMemories = memories?.filter((item) => {
        if (selectedCategory === null) {
            return true;
        }
        item.category === selectedCategory;
    });

    return (
        !isLoading &&
        filteredMemories && (
            <>
                {selectedLog ? (
                    <DetailLog
                        memory={
                            filteredMemories.find(
                                (log) => log.id === selectedLog
                            )!
                        }
                        onBackPress={() => {
                            setSelectedLog(null);
                        }}
                    />
                ) : (
                    <PageLayout>
                        <CalendarList
                            style={styles.calendarContainer}
                            theme={{
                                backgroundColor: Colors.white,
                            }}
                            futureScrollRange={0}
                            initialNumToRender={1}
                            horizontal={true}
                            pagingEnabled={true}
                            hideExtraDays={false}
                            calendarWidth={Dimensions.get("window").width - 20}
                            customHeader={(props: any) => (
                                <CalendarHeader
                                    {...props}
                                    selectedCategory={selectedCategory}
                                    setSelectedCategory={setSelectedCategory}
                                />
                            )}
                            dayComponent={({ date, state }) => (
                                <CalendarDayComponent
                                    date={date}
                                    state={state}
                                    count={
                                        filteredMemories.filter(
                                            (log) =>
                                                log.startDate ===
                                                date!.dateString
                                        ).length
                                    }
                                    imageUrl={
                                        filteredMemories.filter(
                                            (log) =>
                                                log.startDate ===
                                                date!.dateString
                                        )[0]?.memoryItems[0].imageUrl
                                    }
                                    onDayPress={() => {
                                        if (!date) return;
                                        handleDayPress(date.dateString);
                                    }}
                                />
                            )}
                        />
                    </PageLayout>
                )}

                {modalVisible && !selectedLog && (
                    <Modal
                        visible={modalVisible}
                        animationType="fade"
                        transparent={true}
                    >
                        <TouchableWithoutFeedback
                            onPress={() => {
                                setModalVisible(false);
                            }}
                        >
                            <View style={styles.modalOverlay}>
                                <Pressable style={styles.modalContentContainer}>
                                    <ThemedText type="title">
                                        {formatDate(selectedDate!)}
                                    </ThemedText>
                                    {filteredMemories.length > 0 &&
                                        filteredMemories.map(
                                            (log) =>
                                                selectedDate!.toISOString() ===
                                                    new Date(
                                                        log.startDate
                                                    ).toISOString() && (
                                                    <LogItem
                                                        key={log.id}
                                                        id={log.id}
                                                        imageUrl={
                                                            log.memoryItems[0]
                                                                .imageUrl
                                                        }
                                                        title={log.title}
                                                        startDate={
                                                            new Date(
                                                                log.startDate
                                                            )
                                                        }
                                                        endDate={
                                                            new Date(
                                                                log.endDate
                                                            )
                                                        }
                                                        description={
                                                            log.memoryItems[0]
                                                                .content
                                                        }
                                                        setSelectedLog={(
                                                            logId
                                                        ) => {
                                                            setSelectedLog(
                                                                logId
                                                            );
                                                            setModalVisible(
                                                                false
                                                            );
                                                        }}
                                                    />
                                                )
                                        )}
                                    <AddLogButton
                                        onPress={() => {
                                            setSelectedLog(null);
                                            setModalVisible(false);
                                        }}
                                    />
                                </Pressable>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                )}
            </>
        )
    );
}

const styles = StyleSheet.create({
    loadingScreen: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        zIndex: 1,
        backgroundColor: Colors.white,
        marginHorizontal: 20,
    },
    calendarContainer: {
        borderRadius: 12,
        boxShadow: "0 0 4px rgba(0, 0, 0, 0.1)",
        height: "90%",
        width: Dimensions.get("window").width - 20,
        alignSelf: "center",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.gray6 + "20",
    },
    modalContentContainer: {
        backgroundColor: Colors.gray1,
        width: Dimensions.get("window").width - 40,
        maxHeight: "80%",
        padding: 20,
        borderRadius: 12,
        gap: 20,
    },
});
