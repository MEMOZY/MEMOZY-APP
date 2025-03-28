import { Colors } from "@/constants/Colors";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "../common/ThemedText";

interface SettingsItemProps {
    label: string;
    onPress: () => void;
    color?: string;
    rightIcon?: React.ReactNode;
    value?: string;
}

export const SettingsItem = ({
    label,
    onPress,
    color = Colors.light.tabIconSelected,
    rightIcon,
    value,
}: SettingsItemProps) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                    }}
                >
                    <ThemedText
                        type="body2b"
                        lightColor={color}
                        darkColor={color}
                    >
                        {label}
                    </ThemedText>
                    {value && (
                        <ThemedText
                            type="body2"
                            lightColor={color}
                            darkColor={color}
                        >
                            {value}
                        </ThemedText>
                    )}
                </View>
                {rightIcon}
            </View>
        </TouchableOpacity>
    );
};
