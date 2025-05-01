import { apiClient } from "./client";

const chatStart = async (sessionId: string) => {
    const response = await apiClient
        .get(`gpt/chats/start`, {
            params: {
                sessionId,
            },
            withAuth: true,
        })
        .catch((error) => {
            console.log(error);
        });
};

const chatAnswer = async (
    sessionId: string,
    memoryItemTempId: number,
    userAnswer: string
) => {
    const response = await apiClient
        .post(
            `gpt/chats/answer`,
            {
                memoryItemTempId,
                userAnswer,
            },
            {
                withAuth: true,
                params: {
                    sessionId,
                },
            }
        )
        .catch((error) => {
            console.log(error);
        });

    if (!response) {
        throw new Error("챗봇 답변에 실패했습니다.");
    }

    if (response.status !== 200) {
        throw new Error("챗봇 답변에 실패했습니다.");
    }

    return response.data;
};
