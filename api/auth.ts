import { login } from "@react-native-kakao/user";

const getKakaoToken = async () => {
    try {
        const kakaoToken = await login();

        return kakaoToken.accessToken;
    } catch (error) {
        throw new Error("Kakao login failed");
    }
};

const getToken = async (
    platfrom: "google" | "apple" | "kakao",
    accessToken: string
) => {};

const getNewToken = async (refreshToken: string) => {
    try {
        return "123";
    } catch (error) {
        return "";
    }
};

export { getKakaoToken, getToken, getNewToken };
