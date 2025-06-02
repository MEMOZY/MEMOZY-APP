import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

declare module "axios" {
    export interface AxiosRequestConfig {
        withAuth?: boolean;
        isRetry?: boolean;
    }
}

export const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    isRetry: false,
});

apiClient.interceptors.request.use(
    async (config) => {
        if (config.withAuth) {
            const accessToken = await AsyncStorage.getItem("accessToken");
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
                config.withAuth = false;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest.isRetry) {
            originalRequest.isRetry = true;
            try {
                const { accessToken, newRefreshToken } = await refreshToken();
                if (!accessToken || !newRefreshToken) {
                    throw new Error("토큰 갱신 실패");
                }
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                await AsyncStorage.setItem("refreshToken", newRefreshToken);
                await AsyncStorage.setItem("accessToken", accessToken);
                originalRequest.withAuth = false;
                return apiClient(originalRequest);
            } catch (refreshError) {
                console.log("토큰 갱신 실패", refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

async function refreshToken(): Promise<{
    accessToken: string;
    newRefreshToken: string;
}> {
    console.log("🔄 토큰 갱신 시도");
    try {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        const res = await apiClient.post(
            "/auth/reissue",
            {
                refreshToken,
            },
            {
                headers: { Authorization: `Bearer ${refreshToken}` },
                withAuth: false,
                isRetry: true,
            }
        );
        if (res.status === 200) {
            const { accessToken, refreshToken: newRefreshToken } =
                res.data.data;
            return { accessToken, newRefreshToken };
        }
        throw new Error("토큰 갱신 실패");
    } catch (error) {
        throw error;
    }
}
