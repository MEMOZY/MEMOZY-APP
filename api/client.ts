import { useAuth } from "@/contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

declare module "axios" {
    export interface AxiosRequestConfig {
        withAuth?: boolean;
    }
}

export const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
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
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newAccessToken = await refreshToken();
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
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

async function refreshToken() {
    const { login } = useAuth();
    try {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        const res = await apiClient.post("/auth/refresh", {
            headers: { Authorization: `Bearer ${refreshToken}` },
            withAuth: false,
        });
        if (res.status === 200) {
            const { accessToken, refreshToken: newRefreshToken } =
                res.data.data;

            await login(accessToken, newRefreshToken);
            return accessToken;
        }
    } catch (error) {
        throw error;
    }
}
