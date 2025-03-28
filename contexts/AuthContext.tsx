import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
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

    const login = () => setIsLoggedIn(true);
    const logout = () => setIsLoggedIn(false);

    useEffect(() => {
        async function loadAuth() {
            const token = await AsyncStorage.getItem("accessToken");
            // TODO: 토큰 유효성 검증 로직 추가
            if (token) setIsLoggedIn(true);
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
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
