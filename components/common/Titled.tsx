import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

interface TitledProps {
    title: string;
    children: React.ReactNode;
    gap?: number;
}

export default function Titled({ title, children, gap = 10 }: TitledProps) {
    return (
        <View style={{ gap: 10 }}>
            <ThemedText type="body2b">{title}</ThemedText>
            <View style={{ gap }}>{children}</View>
        </View>
    );
}
