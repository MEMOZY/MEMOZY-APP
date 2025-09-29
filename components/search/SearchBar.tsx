import { SearchIcon } from "@/assets/images/icons";
import { Colors } from "@/constants/Colors";
import React, { useCallback, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export type SearchMode = "CONTENT" | "TITLE" | "ALL";

interface SearchBarProps {
    defaultMode?: SearchMode; // 기본: "both"
    initialKeyword?: string;
    initialMode?: SearchMode;
    onSearch?: (params: { keyword: string; mode: SearchMode }) => void; // 결과 콜백
}

export function SearchBar({
    defaultMode = "ALL",
    initialKeyword = "",
    onSearch,
}: SearchBarProps) {
    const [value, setValue] = useState(initialKeyword);
    const [mode, setMode] = useState<SearchMode>(defaultMode);

    const handleSearch = useCallback(() => {
        const q = value.trim();
        if (!q) return;
        onSearch?.({ keyword: q, mode });
    }, [value, mode, onSearch]);

    return (
        <View style={styles.wrapper}>
            {/* 모드 토글 */}
            <View style={styles.modeRow}>
                <ModePill
                    label="내용+제목"
                    active={mode === "ALL"}
                    onPress={() => setMode("ALL")}
                />
                <ModePill
                    label="내용"
                    active={mode === "CONTENT"}
                    onPress={() => setMode("CONTENT")}
                />
                <ModePill
                    label="제목"
                    active={mode === "TITLE"}
                    onPress={() => setMode("TITLE")}
                />
            </View>

            {/* 검색 바 */}
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="일기 검색"
                    placeholderTextColor={Colors.gray5}
                    style={styles.searchInput}
                    value={value}
                    onChangeText={setValue}
                    autoCapitalize="none" // 전체 대문자 방지
                    autoCorrect={false}
                    autoComplete="off"
                    autoFocus={false}
                    keyboardType="default"
                    returnKeyType="search"
                    onSubmitEditing={handleSearch}
                />
                <TouchableOpacity
                    onPress={handleSearch}
                    disabled={!value.trim()}
                    accessibilityRole="button"
                    accessibilityLabel="검색"
                >
                    <SearchIcon
                        color={value.trim() ? Colors.gray6 : Colors.gray4}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

function ModePill({
    label,
    active,
    onPress,
}: {
    label: string;
    active: boolean;
    onPress: () => void;
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.85}
            style={[
                styles.pill,
                active ? styles.pillActive : styles.pillInactive,
            ]}
        >
            <Text
                style={[
                    styles.pillText,
                    active ? styles.pillTextActive : styles.pillTextInactive,
                ]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    wrapper: { gap: 10 },
    modeRow: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
    },
    pill: {
        paddingHorizontal: 12,
        height: 30,
        borderRadius: 999,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
    },
    pillActive: {
        backgroundColor: "#E8F3FF",
        borderColor: "#BBD8FF",
    },
    pillInactive: {
        backgroundColor: "#fff",
        borderColor: "#E5E7EB",
    },
    pillText: { fontSize: 12, fontWeight: "600" },
    pillTextActive: { color: "#0F172A" },
    pillTextInactive: { color: "#6B7280" },

    searchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 12,
        borderRadius: 12,
        backgroundColor: Colors.white,
        height: 48,
        gap: 10,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        fontFamily: "Pretendard-Regular",
    },
});
