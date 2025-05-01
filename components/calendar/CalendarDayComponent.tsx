import { Colors } from "@/constants/Colors";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../common/ThemedText";
import { memo } from "react";
import { DateData } from "react-native-calendars";
import { DayState } from "react-native-calendars/src/types";

interface CalendarDayProps {
    date?: DateData;
    state?: DayState;
    count?: number;
    imageUrl?: string;
    onDayPress?: (date: DateData) => void;
}

function CalendarDayComponent({
    date,
    state,
    count = 0,
    imageUrl,
    onDayPress,
}: CalendarDayProps) {
    if (!date) return null;
    const dayOfWeek = new Date(date.dateString).getDay();

    let dayColor = Colors.gray6;

    if (state !== "disabled") {
        if (dayOfWeek === 0) {
            dayColor = Colors.red;
        } else if (dayOfWeek === 6) {
            dayColor = Colors.blue;
        }
    } else {
        dayColor = Colors.gray3;
    }

    return (
        <TouchableOpacity
            onPress={() => {
                if (onDayPress) {
                    onDayPress(date);
                }
            }}
        >
            <View
                style={[
                    styles.dayContainer,
                    state === "today" && {
                        backgroundColor: Colors.gray2,
                    },
                ]}
            >
                <ThemedText type="caption" style={{ color: dayColor }}>
                    {date.day}
                </ThemedText>

                <View style={styles.dayImageContainer}>
                    {count > 0 && (
                        <>
                            <Image
                                style={styles.dayImage}
                                source={{
                                    uri: imageUrl,
                                }}
                            />
                            <View style={styles.dayImageOverlay}>
                                <ThemedText
                                    type="body1b"
                                    style={{ color: Colors.white }}
                                >
                                    +{count}
                                </ThemedText>
                            </View>
                        </>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
}

// 메모이제이션 적용 + props 변경 여부 확인 함수
export default memo(CalendarDayComponent, (prevProps, nextProps) => {
    return (
        prevProps.date?.dateString === nextProps.date?.dateString &&
        prevProps.state === nextProps.state
    );
});

const styles = StyleSheet.create({
    dayContainer: {
        backgroundColor: Colors.gray1,
        width: "80%",
        minHeight: 50,
        alignItems: "center",
        padding: 4,
        borderRadius: 8,
        boxShadow: "0 0 4px rgba(0, 0, 0, 0.1)",
        gap: 2,
    },
    dayDisabled: {
        color: Colors.gray3,
    },
    dayImageContainer: {
        width: 32,
        height: 32,
        borderRadius: 4,
    },
    dayImage: {
        width: "100%",
        height: "100%",
        borderRadius: 4,
        backgroundColor: Colors.gray2,
    },
    dayImageOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: 4,
    },
});
