import { login } from "@react-native-kakao/user";
import { apiClient } from "./client";
import {
    GoogleSignin,
    isErrorWithCode,
    isSuccessResponse,
    statusCodes,
} from "@react-native-google-signin/google-signin";
import * as AppleAuthentication from "expo-apple-authentication";

const getSocialAccessToken = async (platform: "GOOGLE" | "APPLE" | "KAKAO") => {
    let result = null;
    switch (platform) {
        case "GOOGLE":
            try {
                await GoogleSignin.hasPlayServices();
                const response = await GoogleSignin.signIn();
                if (isSuccessResponse(response)) {
                    const tokens = await GoogleSignin.getTokens();
                    return {
                        socialToken: tokens.accessToken,
                        name: response.data.user?.name || "memozy_user",
                    };
                } else {
                    throw new Error("구글 로그인에 실패했습니다.");
                }
            } catch (error) {
                console.log("Google login error:", error);
                if (isErrorWithCode(error)) {
                    switch (error.code) {
                        case statusCodes.SIGN_IN_CANCELLED:
                            console.log("User cancelled the login flow");
                            break;
                        case statusCodes.IN_PROGRESS:
                            console.log("Sign in is in progress already");
                            break;
                        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                            console.log(
                                "Play services not available or outdated"
                            );
                            break;
                        default:
                            console.log("Some other error happened", error);
                    }
                }
                throw new Error("구글 로그인에 실패했습니다.");
            }
            break;
        case "APPLE":
            try {
                const credential = await AppleAuthentication.signInAsync({
                    requestedScopes: [
                        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                        AppleAuthentication.AppleAuthenticationScope.EMAIL,
                    ],
                });
                return {
                    socialToken: credential.identityToken,
                    name: credential.fullName?.givenName || "memozy_user",
                };
            } catch (error) {
                throw new Error("애플 로그인에 실패했습니다.");
            }
            break;
        case "KAKAO":
            try {
                result = await login();
                return {
                    socialToken: result.accessToken,
                    name: "memozy_user",
                };
            } catch (error) {
                throw new Error("카카오 로그인에 실패했습니다.");
            }
        default:
            throw new Error("지원하지 않는 플랫폼입니다.");
    }
};

const getToken = async (
    platform: "GOOGLE" | "APPLE" | "KAKAO",
    socialAccessToken: string,
    name: string
) => {
    const response = await apiClient
        .post(`auth/social/${platform}/login`, {
            token: socialAccessToken,
            name,
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

const getTestToken = async () => {
    const response = await apiClient
        .post("auth/test-token", {
            userId: 2,
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

export { getSocialAccessToken, getToken, reissueToken, getTestToken };
