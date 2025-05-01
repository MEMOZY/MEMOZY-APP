import { login } from "@react-native-kakao/user";
import { apiClient } from "./client";

const getSocialAccessToken = async (platform: "GOOGLE" | "APPLE" | "KAKAO") => {
    let result = null;
    switch (platform) {
        case "GOOGLE":
            // Implement Google login logic here
            break;
        case "APPLE":
            // Implement Apple login logic here
            break;
        case "KAKAO":
            try {
                result = await login();
                return result.accessToken;
            } catch (error) {
                throw new Error("카카오 로그인에 실패했습니다.");
            }
        default:
            throw new Error("지원하지 않는 플랫폼입니다.");
    }
};

const getToken = async (
    platform: "GOOGLE" | "APPLE" | "KAKAO",
    socialAccessToken: string
) => {
    const response = await apiClient
        .post(`auth/social/${platform}/login`, {
            socialAccessToken,
        })
        .catch((error) => {
            console.log(error);
        });

    if (!response) {
        throw new Error("로그인에 실패했습니다.");
    }

    if (response.status !== 200) {
        throw new Error("로그인에 실패했습니다.");
    }

    return response.data;
};

const reissueToken = async (refreshToken: string) => {
    const response = await apiClient
        .post(
            "auth/reissue",
            {
                refreshToken,
            },
            {
                withAuth: true,
            }
        )
        .catch((error) => {
            console.log(error);
        });

    if (!response) {
        throw new Error("토큰 재발급에 실패했습니다.");
    }

    if (response.status !== 200) {
        throw new Error("토큰 재발급에 실패했습니다.");
    }

    return response.data;
};

export { getSocialAccessToken, getToken, reissueToken };
