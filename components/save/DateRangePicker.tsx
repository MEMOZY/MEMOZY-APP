import { useState } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import DatePicker from "react-native-date-picker";
import { ThemedText } from "../common/ThemedText";
import Titled from "../common/Titled";
import { Colors } from "@/constants/Colors";

interface DateRangePickerProps {
    startDate?: string;
    endDate?: string;
    onChange?: (range: { startDate: Date; endDate: Date }) => void;
}

export const DateRangePicker = ({
    startDate,
    endDate,
    onChange,
}: DateRangePickerProps) => {
    const today = new Date();

    const initialStart = startDate ? new Date(startDate) : today;
    const initialEnd = endDate ? new Date(endDate) : today;

    const [start, setStart] = useState(initialStart);
    const [end, setEnd] = useState(initialEnd);
    const [pickerState, setPickerState] = useState<"start" | "end" | null>(
        null
    );

    const formatDate = (date: Date) =>
        `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

    const handleStartConfirm = (date: Date) => {
        setPickerState(null);
        const adjustedEnd = date > end ? date : end;
        setStart(date);
        setEnd(adjustedEnd);
        onChange?.({ startDate: date, endDate: adjustedEnd });
    };

    const handleEndConfirm = (date: Date) => {
        setPickerState(null);
        const adjustedStart = date < start ? date : start;
        setStart(adjustedStart);
        setEnd(date);
        onChange?.({ startDate: adjustedStart, endDate: date });
    };
    return (
        <Titled title="기간">
            <View style={styles.container}>
                <Pressable onPress={() => setPickerState("start")}>
                    <View style={styles.dateButton}>
                        <ThemedText type="body2">
                            {formatDate(start)}
                        </ThemedText>
                    </View>
                </Pressable>
                <View style={styles.dash} />
                <Pressable onPress={() => setPickerState("end")}>
                    <View style={styles.dateButton}>
                        <ThemedText type="body2">{formatDate(end)}</ThemedText>
                    </View>
                </Pressable>

                {/* 시작일 DatePicker */}
                <DatePicker
                    modal
                    mode="date"
                    open={pickerState === "start"}
                    date={start}
                    maximumDate={today}
                    onConfirm={handleStartConfirm}
                    onCancel={() => setPickerState(null)}
                />

                {/* 종료일 DatePicker */}
                <DatePicker
                    modal
                    mode="date"
                    open={pickerState === "end"}
                    date={end}
                    maximumDate={today}
                    onConfirm={handleEndConfirm}
                    onCancel={() => setPickerState(null)}
                />
            </View>
        </Titled>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 20,
        alignItems: "center",
    },
    dash: {
        width: 8,
        height: 3,
        backgroundColor: Colors.gray4,
        borderRadius: 1.5,
    },
    dateButton: {
        height: 42,
        backgroundColor: Colors.white,
        borderRadius: 12,
        paddingHorizontal: 12,
        justifyContent: "center",
        alignItems: "center",
        minWidth: 120,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: Platform.OS === "android" ? 2 : 0,
    },
});
