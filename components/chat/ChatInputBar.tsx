import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import ChatIconSwitch from "./ChatIconSwitch";
import { Colors } from "@/constants/Colors";
import { useState } from "react";

interface ChatInputBarProps {
    onSend: (message: string) => void;
}

export default function ChatInputBar({ onSend }: ChatInputBarProps) {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        onSend(message.trim());
        setMessage("");
    };

    return (
        <View style={styles.chatInputContainer}>
            <TextInput
                placeholder="메세지 입력 또는 우측 버튼으로 건너뛰기"
                placeholderTextColor={Colors.gray4}
                value={message}
                onChangeText={setMessage}
                style={styles.chatInput}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="off"
                onSubmitEditing={handleSend}
                returnKeyType="send"
            />
            <TouchableOpacity onPress={handleSend}>
                <ChatIconSwitch showSend={message.length > 0} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    bodyContainer: {
        flex: 1,
        backgroundColor: Colors.red,
        marginTop: 20,
        gap: 20,
        justifyContent: "space-between",
    },
    chatInputContainer: {
        height: 48,
        width: "100%",
        backgroundColor: Colors.gray2,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.gray4,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 20,
        gap: 10,
    },
    chatInput: {
        fontFamily: "Pretendard-Regular",
        fontSize: 13,
        color: Colors.gray6,
        flex: 1,
    },
});
