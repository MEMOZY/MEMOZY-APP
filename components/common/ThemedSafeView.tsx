import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { SafeAreaView } from "react-native-safe-area-context";

export type ThemedViewProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
    useSafeArea?: boolean;
};

export function ThemedSafeView({
    style,
    lightColor,
    darkColor,
    useSafeArea = true,
    ...otherProps
}: ThemedViewProps) {
    const backgroundColor = useThemeColor(
        { light: lightColor, dark: darkColor },
        "background"
    );

    const Wrapper = useSafeArea ? SafeAreaView : View;

    return <Wrapper style={[{ backgroundColor }, style]} {...otherProps} />;
}
