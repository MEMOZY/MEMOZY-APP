import { apiClient } from "./client";

const postDeviceToken = async (
    platform: "iOS" | "Android",
    deviceToken: string
) => {
    const response = await apiClient
        .post(
            `device-token`,
            {
                platform,
                deviceToken,
            },
            {
                withAuth: true,
            }
        )
        .catch((error) => {
            console.log(error);
        });

    if (!response) {
        throw new Error("기기 토큰 등록에 실패했습니다.");
    }

    return true;
};

export { postDeviceToken };
