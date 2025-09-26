import { useState } from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from "react-native";
import { DownChevronIcon } from "@/assets/images/icons";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/common/ThemedText";
import { Memory } from "@/api/memory"; // 카테고리 타입용

const CATEGORY_LABELS: Record<Memory["category"], string> = {
    TRAVEL: "여행",
    DAILY: "일상",
    PET: "반려동물",
    DIET: "다이어트",
    FAMILY: "가족",
    COUPLE: "커플",
    COUSTOM: "기타",
};

const CATEGORY_OPTIONS = Object.entries(CATEGORY_LABELS) as [
    Memory["category"],
    string
][];

export default function CategorySelector({
    value,
    onChange,
}: {
    value: Memory["category"] | null;
    onChange: (value: Memory["category"]) => void;
}) {
    const [visible, setVisible] = useState(false);

    const handleSelect = (key: Memory["category"]) => {
        setVisible(false);
        onChange(key);
    };

    return (
        <>
            <TouchableOpacity onPress={() => setVisible(true)}>
                <View style={categoryStyles.category}>
                    <ThemedText
                        lightColor={Colors.gray6}
                        darkColor={Colors.gray6}
                        type="body2b"
                    >
                        {value ? CATEGORY_LABELS[value] : "없음"}
                    </ThemedText>
                    <DownChevronIcon />
                </View>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => setVisible(false)}
            >
                <Pressable
                    style={categoryStyles.overlay}
                    onPress={() => setVisible(false)}
                >
                    <View style={categoryStyles.modal}>
                        <ScrollView>
                            {CATEGORY_OPTIONS.map(([key, label]) => (
                                <Pressable
                                    key={key}
                                    style={[
                                        categoryStyles.option,
                                        value === key &&
                                            categoryStyles.optionSelected,
                                    ]}
                                    onPress={() => handleSelect(key)}
                                >
                                    <Text
                                        style={[
                                            categoryStyles.optionText,
                                            value === key &&
                                                categoryStyles.optionTextSelected,
                                        ]}
                                    >
                                        {label}
                                    </Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>
                </Pressable>
            </Modal>
        </>
    );
}

const categoryStyles = StyleSheet.create({
    category: {
        flexDirection: "row",
        gap: 6,
        alignItems: "center",
        borderRadius: 20,
        paddingHorizontal: 14,
        height: 36,
        alignSelf: "flex-start",
        borderWidth: 1,
        borderColor: Colors.gray3,
        backgroundColor: Colors.white,
    },
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
    },
    modal: {
        backgroundColor: Colors.white,
        paddingVertical: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: "60%",
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 10,
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.gray2,
    },
    optionSelected: {
        backgroundColor: "#F0F5FF",
    },
    optionText: {
        fontSize: 16,
        color: Colors.gray6,
    },
    optionTextSelected: {
        fontWeight: "700",
    },
});
