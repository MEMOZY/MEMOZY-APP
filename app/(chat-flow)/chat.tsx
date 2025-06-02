import { chatAnswer, chatStart } from "@/api/chat";
import ChatInputBar from "@/components/chat/ChatInputBar";
import ChatMessage from "@/components/chat/ChatMessage";
import PageLayout from "@/components/common/PageLayout";
import StepProgressBar from "@/components/common/StepProgressBar";
import { ThemedText } from "@/components/common/ThemedText";
import { Colors } from "@/constants/Colors";
import { useUI } from "@/hooks/useUI";
import { router, useGlobalSearchParams } from "expo-router";
import { memo, useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

type Message = {
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
    const [currentItemTempId, setCurrentItemTempId] = useState<number | null>(
        null
    );

    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [messages.length]);

    useEffect(() => {
        const initChat = async () => {
            try {
                setMessages((prev) => [
                    ...prev,
                    { isMine: false, text: "__TYPING__" },
                ]);

                const res = await chatStart(sessionId);

                setMessages((prev) => [
                    ...prev.filter((m) => m.text !== "__TYPING__"),
                    {
                        isMine: false,
                        text: res.message,
                        imageUrl: res.presignedUrl,
                        memoryItemTempId: res.memoryItemTempId,
                    },
                ]);

                setCurrentItemTempId(res.memoryItemTempId);
            } catch (e) {
                showModal({
                    title: "오류",
                    subtitle: "대화 시작에 실패했습니다.",
                    confirmText: "확인",
                    onConfirm: () => router.replace("/(tabs)"),
                });
            } finally {
                setMessages((prev) =>
                    prev.filter((m) => m.text !== "__TYPING__")
                );
            }
        };

        initChat();
    }, [sessionId]);

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
                        if (
                            messages[messages.length - 1].text === "__TYPING__"
                        ) {
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

                        // 2. 상대방 대답 준비중 메시지 표시
                        setMessages((prev) => [
                            ...prev,
                            { isMine: false, text: "__TYPING__" },
                        ]);

                        try {
                            // 3. 다음 질문 받아오기
                            const res = await chatAnswer(
                                sessionId,
                                currentItemTempId!,
                                input.length > 0 ? input : "end"
                            );

                            if (res.type === "done") {
                                router.replace({
                                    pathname: "/save",
                                    params: {
                                        sessionId: sessionId,
                                        startDate: startDate,
                                        endDate: endDate,
                                    },
                                });
                            }

                            if (res.type === "reply") {
                                setMessages((prev) => [
                                    ...prev.filter(
                                        (m) => m.text !== "__TYPING__"
                                    ),
                                    {
                                        isMine: false,
                                        text: res.message,
                                        imageUrl: undefined,
                                        memoryItemTempId: res.memoryItemId,
                                    },
                                ]);
                            } else if (res.type === "question") {
                                setMessages((prev) => [
                                    ...prev.filter(
                                        (m) => m.text !== "__TYPING__"
                                    ),
                                    {
                                        isMine: false,
                                        text: res.message,
                                        imageUrl: res.presignedUrl,
                                        memoryItemTempId: res.memoryItemTempId,
                                    },
                                ]);
                                setCurrentItemTempId(res.memoryItemTempId);
                                setStep((prev) => prev + 1);
                            }
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
