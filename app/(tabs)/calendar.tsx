import CalendarDayComponent from "@/components/calendar/CalendarDayComponent";
import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import PageLayout from "@/components/common/PageLayout";
import { ThemedText } from "@/components/common/ThemedText";
import AddLogButton from "@/components/logs/AddLogButton";
import DetailLog from "@/components/logs/DetailLog";
import LogItem from "@/components/logs/LogItem";
import { Colors } from "@/constants/Colors";
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
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsReady(true), 300); // 300ms 후 렌더링
    }, []);

    const handleDayPress = (day: string) => {
        setSelectedDate(new Date(day));
        setModalVisible(true);
        console.log("Selected day:", new Date(day));
    };

    return (
        <>
            <DetailLog />
            {/* <PageLayout>
                {!isReady && <View style={styles.loadingScreen} />}
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
                    customHeader={CalendarHeader}
                    dayComponent={({ date, state }) => (
                        <CalendarDayComponent
                            date={date}
                            state={state}
                            onDayPress={() => {
                                if (!date) return;
                                handleDayPress(date.dateString);
                            }}
                        />
                    )}
                />
            </PageLayout>

            {modalVisible && (
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
                                    2025년 3월 11일 (금)
                                </ThemedText>
                                <LogItem
                                    id={1}
                                    title="운동"
                                    imageUrl="https://example.com/image.jpg"
                                    startDate={new Date("2025-03-11T12:00:00Z")}
                                    endDate={new Date("2025-03-11T13:00:00Z")}
                                    description="운동을 했습니다."
                                />
                                <LogItem
                                    id={1}
                                    title="운동"
                                    imageUrl="https://example.com/image.jpg"
                                    startDate={new Date("2025-03-11T12:00:00Z")}
                                    endDate={new Date("2025-03-11T13:00:00Z")}
                                    description="운동을 했습니다."
                                />
                                <AddLogButton
                                    onPress={() => {
                                        setModalVisible(false);
                                    }}
                                />
                            </Pressable>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            )} */}
        </>
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
