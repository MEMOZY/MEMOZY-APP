import { Colors } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";

export const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
    divider: {
        height: 1,
        width: "100%",
        backgroundColor: Colors.gray3,
    },
});
