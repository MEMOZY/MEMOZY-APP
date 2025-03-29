import { SendIcon, SkipIcon } from "@/assets/images/icons";
import PageLayout from "@/components/common/PageLayout";
import StepProgressBar from "@/components/common/StepProgressBar";
import { ThemedText } from "@/components/common/ThemedText";
import { Colors } from "@/constants/Colors";
import { useUI } from "@/hooks/useUI";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function ChatScreen() {
    const { showModal } = useUI();
    const [step, setStep] = useState(0);
    const totalSteps = 3;
    const isEnd = step === totalSteps;
    const [message, setMessage] = useState("");
    return (
        <PageLayout
            headerTitle="채팅"
            hasBack
            backText="취소"
            onBack={() => {
                showModal({
                    title: "정말 취소하시겠습니까?",
                    subtitle: "진행 중인 작업이 모두 취소됩니다.",
                    confirmText: "확인",
                    cancelText: "돌아가기",
                });
            }}
            headerRight={
                <TouchableOpacity disabled={!isEnd} onPress={() => {}}>
                    <ThemedText
                        type="body1"
                        lightColor={isEnd ? Colors.gray6 : Colors.gray4}
                        darkColor={isEnd ? Colors.gray6 : Colors.gray4}
                    >
                        다음
                    </ThemedText>
                </TouchableOpacity>
            }
        >
            <StepProgressBar totalSteps={totalSteps} currentStep={step} />
            <View style={styles.bodyContainer}>
                <View>
                    <ThemedText>123</ThemedText>
                </View>
                <View style={styles.chatInputContainer}>
                    <TextInput
                        placeholder="메세지 입력 또는 우측 버튼으로 건너뛰기"
                        placeholderTextColor={Colors.gray4}
                        value={message}
                        onChangeText={setMessage}
                        style={styles.chatInput}
                    />
                    <TouchableOpacity>
                        <ChatIconSwitch showSend={message.length > 0} />
                    </TouchableOpacity>
                </View>
            </View>
        </PageLayout>
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
    wrapper: {
        width: 24,
        height: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    absolute: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
    },
});

interface Props {
    showSend: boolean; // true면 SendIcon 보여주기
}

function ChatIconSwitch({ showSend }: Props) {
    const sendOpacity = useRef(new Animated.Value(showSend ? 1 : 0)).current;
    const skipOpacity = useRef(new Animated.Value(showSend ? 0 : 1)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(sendOpacity, {
                toValue: showSend ? 1 : 0,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(skipOpacity, {
                toValue: showSend ? 0 : 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    }, [showSend]);

    return (
        <View style={styles.wrapper}>
            <Animated.View style={[styles.absolute, { opacity: skipOpacity }]}>
                <SkipIcon />
            </Animated.View>
            <Animated.View style={[styles.absolute, { opacity: sendOpacity }]}>
                <SendIcon />
            </Animated.View>
        </View>
    );
}
