import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../common/ThemedText";
import { DownChevronIcon } from "@/assets/images/icons";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import CalendarCategories from "./CalendarCategories";
import { Memory } from "@/api/memory";
import { CATEGORY_LABELS } from "@/app/(tabs)/calendar";

interface CalendarHeaderProps {
    month: Date;
    selectedCategory: Memory["category"] | null;
    setSelectedCategory: (category: Memory["category"] | null) => void;
}

export function CalendarHeader({
    month,
    selectedCategory,
    setSelectedCategory,
}: CalendarHeaderProps) {
    const year = month.getFullYear();
    const monthNumber = month.getMonth() + 1;
    const paddedMonth = monthNumber < 10 ? `0${monthNumber}` : `${monthNumber}`;
    const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
    const [categoryVisible, setCategoryVisible] = useState(false);

    return (
        <View style={styles.header}>
            {categoryVisible && (
                <CalendarCategories
                    closeCategories={() => setCategoryVisible(false)}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            )}
            <View style={styles.headerTitle}>
                <ThemedText type="title">{`${year}년 ${paddedMonth}월`}</ThemedText>
                <TouchableOpacity
                    onPress={() => setCategoryVisible(!categoryVisible)}
                >
                    <View style={styles.dropdownContainer}>
                        <ThemedText type="body2b">
                            {selectedCategory
                                ? CATEGORY_LABELS.find(
                                      (category) =>
                                          category.value === selectedCategory
                                  )?.label
                                : "전체"}
                        </ThemedText>
                        <DownChevronIcon color={Colors.gray6} />
                    </View>
                </TouchableOpacity>
            </View>

            {/* 요일 헤더 */}
            <View style={styles.weekdayRow}>
                {weekDays.map((day, index) => (
                    <ThemedText
                        key={index}
                        type="body2b"
                        style={[
                            index === 0 && {
                                color: Colors.red,
                            },
                            index === 6 && {
                                color: Colors.blue,
                            },
                        ]}
                    >
                        {day}
                    </ThemedText>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: Colors.white,
        gap: 20,
    },
    headerTitle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    dropdownContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    weekdayRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 10,
    },
});
