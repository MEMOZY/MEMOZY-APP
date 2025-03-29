import ChatIconSwitch from "@/components/chat/ChatIconSwitch";
import ChatInputBar from "@/components/chat/ChatInputBar";
import ChatMessage from "@/components/chat/ChatMessage";
import PageLayout from "@/components/common/PageLayout";
import StepProgressBar from "@/components/common/StepProgressBar";
import { ThemedText } from "@/components/common/ThemedText";
import { Colors } from "@/constants/Colors";
import { useUI } from "@/hooks/useUI";
import { useState } from "react";
import {
    Image,
    ScrollView,
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
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ gap: 20 }}
                >
                    <ChatMessage
                        isMine={false}
                        text="안녕하세요! 무엇을 도와드릴까요?"
                        imageUrl="https://example.com/image.jpg"
                    />
                    <ChatMessage
                        isMine={true}
                        text="안녕! 나는 사진을 기록하고 싶어."
                    />
                    <ChatMessage
                        isMine={false}
                        text="안녕하세요! 무엇을 도와드릴까요?"
                        imageUrl="https://example.com/image.jpg"
                    />
                    <ChatMessage
                        isMine={true}
                        text="안녕! 나는 사진을 기록하고 싶어."
                    />
                    <ChatMessage
                        isMine={false}
                        text="안녕하세요! 무엇을 도와드릴까요?"
                        imageUrl="https://example.com/image.jpg"
                    />
                    <ChatMessage
                        isMine={true}
                        text="안녕! 나는 사진을 기록하고 싶어."
                    />
                    <ChatMessage
                        isMine={false}
                        text="안녕하세요! 무엇을 도와드릴까요?"
                        imageUrl="https://example.com/image.jpg"
                    />
                    <ChatMessage
                        isMine={true}
                        text="안녕! 나는 사진을 기록하고 싶어."
                    />
                </ScrollView>
                <ChatInputBar />
            </View>
        </PageLayout>
    );
}

const styles = StyleSheet.create({
    bodyContainer: {
        flex: 1,
        marginTop: 20,
        gap: 20,
        justifyContent: "space-between",
    },
});
