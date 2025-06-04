import { chatAnswer, chatStart } from "@/api/chat";
import ChatInputBar from "@/components/chat/ChatInputBar";
import ChatMessage from "@/components/chat/ChatMessage";
import PageLayout from "@/components/common/PageLayout";
import StepProgressBar from "@/components/common/StepProgressBar";
import { ThemedText } from "@/components/common/ThemedText";
import { Colors } from "@/constants/Colors";
import { useUI } from "@/hooks/useUI";
import { router, useGlobalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

export type Message = {
    isMine: boolean;
    text: string;
    imageUrl?: string;
    memoryItemTempId?: string;
};

export default function ChatScreen() {
    const { showModal } = useUI();
    const [step, setStep] = useState(0);
    const sessionId = useGlobalSearchParams().sessionId as string;
    const length = useGlobalSearchParams().length;
    const startDate = useGlobalSearchParams().startDate as string;
    const endDate = useGlobalSearchParams().endDate as string;
    const totalSteps = length ? parseInt(length as string) : 0;
    const isEnd = step === totalSteps;
    const [messages, setMessages] = useState<Message[]>([]);
    const [isReceiving, setIsReceiving] = useState(false);
    const [initComplete, setInitComplete] = useState(false);
    const [memoryItemTempId, setMemoryItemTempId] = useState<string | null>(
        null
    );

    const scrollViewRef = useRef<ScrollView>(null);

    const addMessage = (message: Message) => {
        setMessages((prev) => [
            ...prev.filter((m) => m.text !== "__TYPING__"),
            message,
        ]);
    };

    const updateMessage = (message: Message) => {
        setMessages((prev) => prev.slice(0, -1).concat(message));
    };

    const doneReceiving = (memoryItemTempId: string) => {
        setMemoryItemTempId(memoryItemTempId);
        setIsReceiving(false);
    };

    const incrementStep = () => {
        setStep((prev) => prev + 1);
    };

    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [messages.length]);

    useEffect(() => {
        if (initComplete) return;
        const initChat = async () => {
            try {
                setIsReceiving(true);
                await chatStart(
                    sessionId,
                    addMessage,
                    updateMessage,
                    doneReceiving
                );
            } catch (e) {
                showModal({
                    title: "오류",
                    subtitle: "대화 시작에 실패했습니다.",
                    confirmText: "확인",
                    onConfirm: () => router.replace("/(tabs)"),
                });
            } finally {
                setInitComplete(true);
            }
        };

        initChat();
    }, [initComplete, sessionId]);

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
                    onConfirm: () => {
                        router.replace("/(tabs)");
                    },
                });
            }}
            headerRight={
                <TouchableOpacity
                    disabled={!isEnd}
                    onPress={() => {
                        router.replace("/edit");
                    }}
                >
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
                    ref={scrollViewRef}
                    style={{
                        flex: 1,
                        marginHorizontal: -30,
                        paddingHorizontal: 30,
                    }}
                    contentContainerStyle={{ gap: 20 }}
                >
                    {messages.map((msg, idx) => (
                        <ChatMessage
                            key={idx}
                            isMine={msg.isMine}
                            text={msg.text}
                            imageUrl={msg.imageUrl}
                        />
                    ))}
                </ScrollView>
                <ChatInputBar
                    onSend={async (input) => {
                        //메세지에 TYPING이 있을 경우 아직 대답이 오지 않은 상태이므로
                        // 아직 보내지 못한다는 안내
                        if (isReceiving) {
                            showModal({
                                title: "대답을 기다려주세요.",
                                subtitle: "상대방이 대답하는 중입니다.",
                                confirmText: "확인",
                            });
                            return;
                        }
                        // 1. 내 메시지 추가
                        setMessages((prev) => [
                            ...prev,
                            {
                                isMine: true,
                                text: input.length > 0 ? input : "건너뛰기",
                            },
                        ]);

                        setMessages((prev) => [
                            ...prev,
                            {
                                isMine: false,
                                text: "__TYPING__",
                            },
                        ]);

                        try {
                            // 3. 다음 질문 받아오기
                            setIsReceiving(true);
                            await chatAnswer(
                                sessionId,
                                memoryItemTempId!,
                                input.length > 0 ? input : "end",
                                addMessage,
                                updateMessage,
                                doneReceiving,
                                incrementStep
                            );
                        } catch (e) {
                            showModal({
                                title: "오류",
                                subtitle: "대화 중 문제가 발생했습니다.",
                                confirmText: "확인",
                                onConfirm: () => router.replace("/(tabs)"),
                            });
                        }
                    }}
                />
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
