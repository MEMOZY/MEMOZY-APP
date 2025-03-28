import { Colors } from "@/constants/Colors";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "../common/ThemedText";

interface LogOptionsProps {
    onOptionPress?: () => void;
}

export default function LogOptions({ onOptionPress }: LogOptionsProps) {
    return (
        <View
            style={{
                alignItems: "center",
                justifyContent: "space-between",
                width: 70,
                backgroundColor: Colors.white,
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: 12,
                gap: 10,
                padding: 10,
                position: "absolute",
                right: 0,
                top: 30,
                zIndex: 1,
            }}
        >
            <TouchableOpacity
                onPress={() => {
                    console.log("Edit pressed");
                    onOptionPress?.();
                }}
            >
                <ThemedText
                    type="body2"
                    lightColor={Colors.light.tabIconSelected}
                    darkColor={Colors.dark.tabIconSelected}
                >
                    수정
                </ThemedText>
            </TouchableOpacity>
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: Colors.gray3,
                }}
            />
            <TouchableOpacity
                onPress={() => {
                    console.log("Delete pressed");
                    onOptionPress?.();
                }}
            >
                <ThemedText
                    type="body2"
                    lightColor={Colors.red}
                    darkColor={Colors.red}
                >
                    삭제
                </ThemedText>
            </TouchableOpacity>
        </View>
    );
}
