import { apiClient } from "./client";

export interface Memory {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    category:
        | "TRAVEL"
        | "DAILY"
        | "PET"
        | "DIET"
        | "FAMILY"
        | "COUPLE"
        | "COUSTOM";
    memoryItems: MemoryItem[];
    sharedUserIds: number[];
}

export const CATEGORY_LABELS: {
    label: string;
    value: Memory["category"] | null;
}[] = [
    { label: "전체", value: null },
    { label: "여행", value: "TRAVEL" },
    { label: "일상", value: "DAILY" },
    { label: "반려동물", value: "PET" },
    { label: "다이어트", value: "DIET" },
    { label: "가족", value: "FAMILY" },
    { label: "커플", value: "COUPLE" },
    { label: "기타", value: "COUSTOM" },
];

export interface PostMemoryPayload {
    title: string;
    category: Memory["category"];
    startDate: string;
    endDate: string;
    sessionId: string;
    sharedUsersId: number[];
}

export interface MemoryItem {
    imageUrl: string;
    content: string;
    sequence: number;
}

const putMemory = async (memoryId: number, memory: Memory) => {
    const response = await apiClient
        .put(`memory/${memoryId}`, memory, {
            withAuth: true,
        })
        .catch((error) => {
            console.log(error);
        });

    if (!response) {
        throw new Error("메모리 수정에 실패했습니다.");
    }

    if (response.status !== 200) {
        throw new Error("메모리 수정에 실패했습니다.");
    }

    return response.data;
};

const deleteMemory = async (memoryId: number) => {
    const response = await apiClient
        .delete(`memory/${memoryId}`, {
            withAuth: true,
        })
        .catch((error) => {
            console.log(error);
        });

    if (!response) {
        throw new Error("메모리 삭제에 실패했습니다.");
    }

    if (response.status !== 200) {
        throw new Error("메모리 삭제에 실패했습니다.");
    }

    return response.data;
};

const getMemories = async () => {
    const response = await apiClient
        .get("memory", {
            withAuth: true,
        })
        .catch((error) => {
            console.log(error);
        });

    if (!response) {
        throw new Error("메모리 조회에 실패했습니다.");
    }

    if (response.status !== 200) {
        throw new Error("메모리 조회에 실패했습니다.");
    }

    return response.data.memories as Memory[];
};

const postMemory = async (memory: PostMemoryPayload) => {
    const response = await apiClient
        .post("memory", memory, {
            withAuth: true,
        })
        .catch((error) => {
            console.log(error);
        });

    if (!response) {
        throw new Error("메모리 생성에 실패했습니다.");
    }

    if (response.status !== 200) {
        throw new Error("메모리 생성에 실패했습니다.");
    }

    return response.data;
};

const postMemoryTemp = async (memoryItems: MemoryItem[]) => {
    const response = await apiClient
        .post(
            "memory/temp",
            { memoryItems: memoryItems },
            {
                withAuth: true,
            }
        )
        .catch((error) => {
            console.log(error);
        });

    if (!response) {
        throw new Error("메모리 임시저장에 실패했습니다.");
    }

    if (response.status !== 200) {
        throw new Error("메모리 임시저장에 실패했습니다.");
    }

    return response.data.sessionId;
};

const getMemoryTempItems = async (sessionId: string) => {
    const response = await apiClient
        .get(`memory/temp/${sessionId}/items`, {
            withAuth: true,
        })
        .catch((error) => {
            console.log(error);
        });

    if (!response) {
        throw new Error("메모리 임시저장 조회에 실패했습니다.");
    }

    if (response.status !== 200) {
        throw new Error("메모리 임시저장 조회에 실패했습니다.");
    }

    return response.data;
};

export {
    putMemory,
    deleteMemory,
    getMemories,
    postMemory,
    postMemoryTemp,
    getMemoryTempItems,
};
