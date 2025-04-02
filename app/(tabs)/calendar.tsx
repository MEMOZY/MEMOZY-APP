import CalendarDayComponent from "@/components/calendar/CalendarDayComponent";
import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import PageLayout from "@/components/common/PageLayout";
import { ThemedText } from "@/components/common/ThemedText";
import AddLogButton from "@/components/logs/AddLogButton";
import LogItem from "@/components/logs/LogItem";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import {
    Dimensions,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { CalendarList } from "react-native-calendars";
import { Timestamp } from "react-native-reanimated/lib/typescript/commonTypes";

export default function CalendarScreen() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleDayPress = (day: Timestamp) => {
        setSelectedDate(new Date(day));
        setModalVisible(true);
        console.log("Selected day:", new Date(day));
    };
    return (
        <>
            <PageLayout>
                <CalendarList
                    style={styles.calendarContainer}
                    theme={{
                        backgroundColor: Colors.white,
                    }}
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
                                handleDayPress(date.timestamp);
                            }}
                        />
                    )}
                />
            </PageLayout>
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
        </>
    );
}

const styles = StyleSheet.create({
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
