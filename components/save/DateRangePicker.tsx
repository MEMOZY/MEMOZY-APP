import { StyleSheet, View } from "react-native";
import Titled from "../common/Titled";
import { TextInput } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";

export const DateRangePicker = () => {
    return (
        <Titled title="기간">
            <View
                style={{
                    flexDirection: "row",
                    gap: 20,
                    alignItems: "center",
                }}
            >
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="시작일"
                        placeholderTextColor={Colors.gray4}
                        style={styles.input}
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoComplete="off"
                        maxLength={20}
                    />
                </View>
                <View
                    style={{
                        width: 8,
                        height: 3,
                        backgroundColor: Colors.gray4,
                        borderRadius: 1.5,
                        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
                    }}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="종료일"
                        placeholderTextColor={Colors.gray4}
                        style={styles.input}
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoComplete="off"
                        maxLength={20}
                    />
                </View>
            </View>
        </Titled>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        height: 42,
        backgroundColor: Colors.white,
        borderRadius: 12,
        paddingHorizontal: 12,
        justifyContent: "center",
        alignSelf: "flex-start",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        minWidth: 120,
    },
    input: {
        fontFamily: "Pretendard-Regular",
        fontSize: 13,
        color: Colors.gray6,
        flex: 1,
    },
});
