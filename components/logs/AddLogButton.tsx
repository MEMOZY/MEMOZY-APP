import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "../common/ThemedText";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

export default function AddLogButton() {
    return (
        <TouchableOpacity
            onPress={() => {
                router.push("/(chat-flow)/select");
            }}
        >
            <View
                style={{
                    height: 50,
                    backgroundColor: Colors.gray2,
                    justifyContent: "center",
                    paddingLeft: 20,
                    borderRadius: 8,
                }}
            >
                <ThemedText
                    type="body2b"
                    lightColor={Colors.light.tabIconDefault}
                    darkColor={Colors.dark.tabIconDefault}
                >
                    + 새로운 기록을 추가하세요
                </ThemedText>
            </View>
        </TouchableOpacity>
    );
}
