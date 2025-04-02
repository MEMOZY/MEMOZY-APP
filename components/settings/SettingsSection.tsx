import { Colors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";

interface SettingsSectionProps {
    children: React.ReactNode;
}

export const SettingsSection = ({ children }: SettingsSectionProps) => {
    return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {
        alignItems: "flex-start",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: Colors.white,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: 12,
        gap: 10,
        padding: 12,
    },
});
