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
    const segments = useSegments();

    // 로그인 함수
    const login = () => {
        setIsLoggedIn(true);
    };

    // 로그아웃 함수
    const logout = () => {
        setIsLoggedIn(false);
    };

    // 로그인 상태에 따른 페이지 라우팅
    useEffect(() => {
        const inAuthGroup = segments[0] === "(auth)";

        if (!isLoggedIn && !inAuthGroup) {
            router.replace("/login");
        } else if (isLoggedIn && inAuthGroup) {
            router.replace("/");
        }
    }, [isLoggedIn, segments]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
