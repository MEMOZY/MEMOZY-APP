import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    accessToken?: string;
    refreshToken?: string;
    login: (accessToken: string, refreshToken: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth는 AuthProvider 안에서만 사용할 수 있습니다.");
    return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useState<string>();
    const [refreshToken, setRefreshToken] = useState<string>();
    const [isAuthLoaded, setIsAuthLoaded] = useState<boolean>(false);

    const segments = useSegments();

    const login = async (accessToken: string, refreshToken: string) => {
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setIsLoggedIn(true);
    };

    const logout = async () => {
        await AsyncStorage.removeItem("accessToken");
        await AsyncStorage.removeItem("refreshToken");
        setAccessToken(undefined);
        setRefreshToken(undefined);
        setIsLoggedIn(false);
    };

    useEffect(() => {
        async function loadAuth() {
            const storedAccessToken = await AsyncStorage.getItem("accessToken");
            const storedRefreshToken = await AsyncStorage.getItem(
                "refreshToken"
            );

            console.log("Stored Access Token:", storedAccessToken);
            console.log("Stored Refresh Token:", storedRefreshToken);

            if (storedAccessToken && storedRefreshToken) {
                setAccessToken(storedAccessToken);
                setRefreshToken(storedRefreshToken);
                setIsLoggedIn(true);
            }

            setIsAuthLoaded(true);
        }

        loadAuth();
    }, []);

    useEffect(() => {
        if (!isAuthLoaded) return;

        const inAuthGroup = segments[0] === "(auth)";

        if (!isLoggedIn && !inAuthGroup) router.replace("/login");
        else if (isLoggedIn && inAuthGroup) router.replace("/");
    }, [isLoggedIn, isAuthLoaded, segments]);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                accessToken,
                refreshToken,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
