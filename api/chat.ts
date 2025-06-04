import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiClient } from "./client";
import EventSource from "react-native-sse";
import { Message } from "@/app/(chat-flow)/chat";

const chatStart = async (
    sessionId: string,
    addMessage: (message: Message) => void,
    updateMessage: (message: Message) => void,
    doneReceiving: (memoryItemTempId: string) => void
) => {
    const token = await AsyncStorage.getItem("accessToken");
    const url = new URL(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}gpt/chats/start`
    );

    url.searchParams.set("sessionId", sessionId);

    let message: string | null = "";
    let currentMemoryItemTempId: string | null = null;

    const es = new EventSource(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: "GET",
    });

    es.addEventListener("first-question", (event) => {
        try {
            const parsed = JSON.parse(event.data);
            message = "";

            addMessage({
                isMine: false,
                text: "__TYPING__",
                imageUrl: parsed.presignedUrl,
                memoryItemTempId: parsed.memoryItemTempId,
            });

            currentMemoryItemTempId = parsed.memoryItemTempId;
        } catch (e) {
            console.error("first-question 파싱 실패", event.data, e);
        }
    });

    es.addEventListener("reply", (event) => {
        try {
            const parsed = JSON.parse(event.data);

            message = message + parsed.message;

            updateMessage({
                isMine: false,
                text: message ?? "",
                imageUrl: parsed.presignedUrl,
                memoryItemTempId: parsed.memoryItemTempId,
            });

            currentMemoryItemTempId = parsed.memoryItemTempId;
        } catch (e) {
            console.error("reply 파싱 실패", event.data, e);
        }
    });

    es.addEventListener("done", () => {
        es.removeAllEventListeners();
        es.close();
        doneReceiving(currentMemoryItemTempId!);
    });

    return () => {
        es.removeAllEventListeners();
        es.close();
    };
};

const chatAnswer = async (
    sessionId: string,
    memoryItemTempId: string,
    userAnswer: string,
    addMessage: (message: Message) => void,
    updateMessage: (message: Message) => void,
    doneReceiving: (memoryItemTempId: string) => void,
    incrementStep: () => void
) => {
    const token = await AsyncStorage.getItem("accessToken");
    const url = new URL(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}gpt/chats/answer`
    );

    url.searchParams.set("sessionId", sessionId);

    let message: string | null = "";
    let currentMemoryItemTempId: string | null = null;
    let imageUrl: string | null = "";

    const es = new EventSource(url, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "text/event-stream",
        },
        body: JSON.stringify({
            memoryItemTempId,
            userAnswer,
        }),
        method: "POST",
    });

    es.addEventListener("open-question", (event) => {
        incrementStep();
        try {
            const parsed = JSON.parse(event.data);
            message = "";
            imageUrl = parsed.presignedUrl;

            addMessage({
                isMine: false,
                text: "__TYPING__",
                imageUrl: imageUrl ?? undefined,
                memoryItemTempId: parsed.memoryItemTempId,
            });

            currentMemoryItemTempId = parsed.memoryItemTempId;
        } catch (e) {
            console.error("open-reply 파싱 실패", event.data, e);
        }
    });

    es.addEventListener("open-reply", (event) => {
        try {
            const parsed = JSON.parse(event.data);
            message = "";

            addMessage({
                isMine: false,
                text: "__TYPING__",
                imageUrl: undefined,
                memoryItemTempId: parsed.memoryItemTempId,
            });

            currentMemoryItemTempId = parsed.memoryItemTempId;
        } catch (e) {
            console.error("open-reply 파싱 실패", event.data, e);
        }
    });

    es.addEventListener("reply", (event) => {
        try {
            const parsed = JSON.parse(event.data);
            message = message + parsed.message;

            updateMessage({
                isMine: false,
                text: message ?? "",
                imageUrl: imageUrl ?? undefined,
                memoryItemTempId: parsed.memoryItemTempId,
            });

            currentMemoryItemTempId = parsed.memoryItemTempId;
        } catch (e) {
            console.error("reply 파싱 실패", event.data, e);
        }
    });

    es.addEventListener("done", () => {
        doneReceiving(currentMemoryItemTempId!);
        es.removeAllEventListeners();
        es.close();
    });

    return () => {
        es.removeAllEventListeners();
        es.close();
    };
};

export { chatStart, chatAnswer };
