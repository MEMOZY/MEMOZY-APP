import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
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
    const [isAuthLoaded, setIsAuthLoaded] = useState<boolean>(false);

    const segments = useSegments();

    const login = async (accessToken: string, refreshToken: string) => {
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);
        setIsLoggedIn(true);
    };

    const logout = async () => {
        await AsyncStorage.removeItem("accessToken");
        await AsyncStorage.removeItem("refreshToken");
        setIsLoggedIn(false);
    };

    useEffect(() => {
        async function loadAuth() {
            const storedAccessToken = await AsyncStorage.getItem("accessToken");
            const storedRefreshToken = await AsyncStorage.getItem(
                "refreshToken"
            );

            if (storedAccessToken && storedRefreshToken) {
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
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
