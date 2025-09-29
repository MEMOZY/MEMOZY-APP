import { apiClient } from "./client";

export type PermissionLevel = "VIEWER" | "EDITOR" | "OWNER";
export interface AccessInfo {
    userId: number;
    permissionLevel: PermissionLevel;
}

export interface Memory {
    id: number;
    ownerId: number;
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
    accessInfos: AccessInfo[];
    permissionLevel: PermissionLevel;
    canEdit: boolean;
}

export interface MemoryThumbnail {
    id: number;
    ownerId: number;
    title: string;
    content: string;
    startDate: string;
    endDate: string;
    thumbnailUrl: string;
    permissionLevel: PermissionLevel;
    canEdit: boolean;
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
    accesses: AccessInfo[];
}

export interface PutMemoryPayload {
    title: string;
    category: Memory["category"];
    startDate: string;
    endDate: string;
    memoryItems: MemoryItem[];
    accesses: AccessInfo[];
}
export interface MemoryItem {
    imageUrl: string;
    content: string;
    sequence: number;
}

export interface SearchMemoryPayload {
    "search-type": "TITLE" | "CONTENT" | "ALL";
    keyword: string;
    page: number;
    size: number;
}

export interface SearchMemoryResponse {
    content: MemoryThumbnail[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
}

const putMemory = async (memoryId: number, memory: PutMemoryPayload) => {
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

    if (response.status !== 204) {
        throw new Error("메모리 삭제에 실패했습니다.");
    }

    return true;
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

    return response.data.memories as MemoryThumbnail[];
};

const getMemory = async (memoryId: number) => {
    const response = await apiClient
        .get(`memory/${memoryId}`, {
            withAuth: true,
        })
        .catch((error) => {
            console.log(error);
        });

    if (!response) {
        throw new Error("메모리 조회에 실패했습니다.");
    }

    return response.data.memoryDetails as Memory;
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

const searchMemories = async (payload: SearchMemoryPayload) => {
    const response = await apiClient
        .get("memory/search", {
            params: payload,
            withAuth: true,
        })
        .catch((error) => {
            console.log(error);
        });

    if (!response) {
        throw new Error("메모리 검색에 실패했습니다.");
    }

    if (response.status !== 200) {
        throw new Error("메모리 검색에 실패했습니다.");
    }

    return response.data as SearchMemoryResponse;
};

export {
    putMemory,
    deleteMemory,
    getMemories,
    postMemory,
    postMemoryTemp,
    getMemoryTempItems,
    getMemory,
    searchMemories,
};
