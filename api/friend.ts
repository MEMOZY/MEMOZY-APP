import { apiClient } from "./client";

export type Friend = {
    userId: string;
    nickname: string;
    profileImageUrl: string;
};

const getFriends = async () => {
    const response = await apiClient
        .get(`friends/list`, {
            withAuth: true,
        })
        .catch((error) => {
            console.log(error);
        });

    if (!response) {
        throw new Error("친구 목록을 가져오는 데 실패했습니다.");
    }

    if (response.status !== 200) {
        throw new Error("친구 목록을 가져오는 데 실패했습니다.");
    }

    const data = response.data.friends as Friend[];

    return data;
};

const getReceivedFriendRequests = async () => {
    const response = await apiClient
        .get(`friends/received-requests`, {
            withAuth: true,
        })
        .catch((error) => {
            console.log(error);
        });

    if (!response) {
        throw new Error("친구 요청을 가져오는 데 실패했습니다.");
    }

    if (response.status !== 200) {
        throw new Error("친구 요청을 가져오는 데 실패했습니다.");
    }

    const data = response.data.friends as Friend[];

    return data;
};

const getSentFriendRequests = async () => {
    const response = await apiClient
        .get(`friends/sent-requests`, {
            withAuth: true,
        })
        .catch((error) => {
            console.log(error);
        });

    if (!response) {
        throw new Error("친구 요청을 가져오는 데 실패했습니다.");
    }

    if (response.status !== 200) {
        throw new Error("친구 요청을 가져오는 데 실패했습니다.");
    }

    const data = response.data.friends as Friend[];

    return data;
};

const requestFriend = async (targetUserId: string) => {
    const response = await apiClient
        .post(`friends/request/${targetUserId}`, {
            withAuth: true,
        })
        .catch((error) => {
            console.log(error);
        });

    if (!response) {
        throw new Error("친구 요청에 실패했습니다.");
    }

    if (response.status !== 200) {
        throw new Error("친구 요청에 실패했습니다.");
    }

    return true;
};

const acceptFriendRequest = async (targetUserId: string) => {
    const response = await apiClient
        .post(`friends/accept/${targetUserId}`, {
            withAuth: true,
        })
        .catch((error) => {
            console.log(error);
        });

    if (!response) {
        throw new Error("친구 요청 수락에 실패했습니다.");
    }

    if (response.status !== 200) {
        throw new Error("친구 요청 수락에 실패했습니다.");
    }

    return true;
};

const rejectFriendRequest = async (targetUserId: string) => {
    const response = await apiClient
        .post(`friends/reject/${targetUserId}`, {
            withAuth: true,
        })
        .catch((error) => {
            console.log(error);
        });

    if (!response) {
        throw new Error("친구 요청 거절에 실패했습니다.");
    }

    if (response.status !== 200) {
        throw new Error("친구 요청 거절에 실패했습니다.");
    }

    return true;
};

const deleteFriend = async (targetUserId: string) => {
    const response = await apiClient
        .post(`friends/remove/${targetUserId}`, {
            withAuth: true,
        })
        .catch((error) => {
            console.log(error);
        });

    if (!response) {
        throw new Error("친구 삭제에 실패했습니다.");
    }

    if (response.status !== 200) {
        throw new Error("친구 삭제에 실패했습니다.");
    }

    return true;
};

export {
    getFriends,
    getReceivedFriendRequests,
    getSentFriendRequests,
    requestFriend,
    acceptFriendRequest,
    rejectFriendRequest,
    deleteFriend,
};
