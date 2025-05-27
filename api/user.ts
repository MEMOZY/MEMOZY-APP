import { apiClient } from "./client";

export interface User {
    userId: number;
    nickname: string;
    profileImageUrl: string;
    email: string;
    phoneNumber: string;
    friendCode: string;
}

export interface UserUpdate {
    nickname: string;
    email: string;
    profileImageUrl: string;
    phoneNumber: string;
}

const getUser = async () => {
    const response = await apiClient
        .get("user", {
            withAuth: true,
        })
        .catch((error) => {
            console.log(error);
        });

    if (!response) {
        throw new Error("유저 조회에 실패했습니다.");
    }

    if (response.status !== 200) {
        throw new Error("유저 조회에 실패했습니다.");
    }

    return response.data as User;
};

const deleteUser = async () => {
    const response = await apiClient
        .delete("user", {
            withAuth: true,
        })
        .catch((error) => {
            console.log(error);
        });

    if (!response) {
        throw new Error("유저 삭제에 실패했습니다.");
    }

    if (response.status !== 200) {
        throw new Error("유저 삭제에 실패했습니다.");
    }

    return response.data;
};

const patchUser = async (userUpdate: UserUpdate) => {
    const response = await apiClient
        .patch("user", userUpdate, {
            withAuth: true,
        })
        .catch((error) => {
            console.log(error);
        });

    if (!response) {
        throw new Error("유저 수정에 실패했습니다.");
    }

    if (response.status !== 200) {
        throw new Error("유저 수정에 실패했습니다.");
    }

    return response.data;
};

const getUserById = async (userId: number) => {
    const response = await apiClient
        .get(`user/${userId}`, {
            withAuth: true,
        })
        .catch((error) => {
            console.log(error);
        });

    if (!response) {
        throw new Error("유저 조회에 실패했습니다.");
    }

    if (response.status !== 200) {
        throw new Error("유저 조회에 실패했습니다.");
    }

    return response.data;
};

const getUserIdByFriendCode = async (friendCode: string) => {
    const response = await apiClient
        .get(`user/${friendCode}`, {
            withAuth: true,
        })
        .catch((error) => {
            console.log(error);
        });

    if (!response) {
        throw new Error("유저 조회에 실패했습니다.");
    }

    if (response.status !== 200) {
        throw new Error("유저 조회에 실패했습니다.");
    }

    return response.data.userId;
};

export { getUser, deleteUser, patchUser, getUserById, getUserIdByFriendCode };
