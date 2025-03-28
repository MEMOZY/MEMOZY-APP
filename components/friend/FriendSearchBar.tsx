import { SearchIcon } from "@/assets/images/icons";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export function FriendSearchBar() {
    const [code, setCode] = useState("");
    return (
        <View style={styles.searchContainer}>
            <TextInput
                placeholder="상대방 코드로 검색"
                placeholderTextColor={Colors.gray5}
                style={{
                    flex: 1,
                    fontSize: 16,
                    fontFamily: "Pretendard-Regular",
                }}
                value={code}
                onChangeText={(text) => setCode(text)}
                autoCapitalize="characters"
                autoCorrect={false}
                autoComplete="off"
                autoFocus={false}
                keyboardType="ascii-capable"
            />
            <TouchableOpacity>
                <SearchIcon />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 12,
        borderRadius: 12,
        backgroundColor: Colors.gray3,
        height: 48,
        gap: 10,
    },
});
