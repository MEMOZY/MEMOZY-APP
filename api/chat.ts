import { apiClient } from "./client";

const chatStart = async (sessionId: string) => {
    const response = await apiClient
        .get(`gpt/chats/start`, {
            params: {
                sessionId,
            },
            withAuth: true,
            timeout: 1000 * 60 * 5, // 5분
        })
        .catch((error) => {
            console.log(error.response);
            console.log(error.message);
            console.log(error.request);
        });
    if (!response) {
        throw new Error("챗봇 시작에 실패했습니다.");
    }
    if (response.status !== 200) {
        throw new Error("챗봇 시작에 실패했습니다.");
    }
    console.log("response", response.data);
    const raw = response.data as string;

    // "data:"로 시작하는 줄 찾기
    const dataLine = raw.split("\n").find((line) => line.startsWith("data:"));

    if (!dataLine) {
        throw new Error("응답 데이터가 올바르지 않습니다.");
    }

    const jsonString = dataLine.replace("data:", "").trim();
    const parsed = JSON.parse(jsonString);

    console.log("parsed", parsed);

    return parsed;
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
                timeout: 1000 * 60 * 5, // 5분
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

    const raw = response.data as string;

    // "data:"로 시작하는 줄 찾기
    const dataLine = raw.split("\n").find((line) => line.startsWith("data:"));

    if (!dataLine) {
        throw new Error("응답 데이터가 올바르지 않습니다.");
    }

    const jsonString = dataLine.replace("data:", "").trim();
    const parsed = JSON.parse(jsonString);

    console.log("parsed", parsed);

    return parsed;
};

export { chatStart, chatAnswer };
