import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

interface TitledProps {
    title: string;
    children: React.ReactNode;
}

export default function Titled({ title, children }: TitledProps) {
    return (
        <View style={{ gap: 10 }}>
            <ThemedText type="body2b">Friends</ThemedText>
            {children}
        </View>
    );
}
