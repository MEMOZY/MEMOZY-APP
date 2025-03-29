import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/Colors";

interface ButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    color?: string;
    disabledColor?: string;
    backgroundColor?: string;
    disabledBackgroundColor?: string;
    style?: object;
    height?: number;
}

export default function Button({
    title,
    onPress,
    disabled = false,
    color = Colors.gray1,
    disabledColor = Colors.gray1,
    backgroundColor = Colors.gray5,
    disabledBackgroundColor = Colors.gray4,
    style,
    height = 58,
}: ButtonProps) {
    return (
        <TouchableOpacity
            style={{ width: "100%", ...style }}
            disabled={disabled}
            onPress={() => {
                if (!disabled) {
                    onPress();
                }
            }}
        >
            <View
                style={[
                    {
                        height: height,
                        width: "100%",
                        borderRadius: 12,
                        alignItems: "center",
                        justifyContent: "center",
                    },
                    {
                        backgroundColor: disabled
                            ? disabledBackgroundColor
                            : backgroundColor,
                    },
                ]}
            >
                <ThemedText
                    type="body1b"
                    lightColor={Colors.gray1}
                    darkColor={Colors.gray1}
                >
                    저장
                </ThemedText>
            </View>
        </TouchableOpacity>
    );
}
