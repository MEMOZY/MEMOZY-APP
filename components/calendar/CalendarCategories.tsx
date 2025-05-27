import { Colors } from "@/constants/Colors";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../common/ThemedText";
import { CATEGORY_LABELS, Memory } from "@/api/memory";

interface CalendarCategoriesProps {
    closeCategories: () => void;
    selectedCategory: Memory["category"] | null;
    setSelectedCategory: (category: Memory["category"] | null) => void;
}

export default function CalendarCategories({
    closeCategories,
    selectedCategory,
    setSelectedCategory,
}: CalendarCategoriesProps) {
    return (
        <View style={styles.container}>
            {CATEGORY_LABELS.map(({ label, value }, index) => (
                <View
                    key={value ?? "ALL"}
                    style={{ width: "100%", alignItems: "center" }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            setSelectedCategory(value);
                            closeCategories();
                        }}
                        style={{ marginBottom: 10 }}
                    >
                        <ThemedText
                            type={
                                selectedCategory === value ? "body2b" : "body2"
                            }
                            lightColor={Colors.gray5}
                            darkColor={Colors.gray5}
                        >
                            {label}
                        </ThemedText>
                    </TouchableOpacity>
                    {index < CATEGORY_LABELS.length - 1 && (
                        <View style={styles.line} />
                    )}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "space-between",
        width: 70,
        backgroundColor: Colors.white,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: 12,
        gap: 10,
        padding: 10,
        position: "absolute",
        right: 7,
        top: 40,
        zIndex: 10,
    },
    line: {
        height: 1,
        width: "100%",
        backgroundColor: Colors.gray3,
    },
});
