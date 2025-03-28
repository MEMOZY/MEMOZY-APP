import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider } from "@/contexts/AuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { UIProvider } from "@/contexts/UIContext";
import { GlobalModal } from "@/components/common/GlobalModal";
import { GlobalSnackbar } from "@/components/common/GlobalSnackbar";

// 사전 로딩을 위해 스플래시 스크린을 숨기지 않음
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        "Pretendard-Bold": require("@/assets/fonts/Pretendard-Bold.otf"),
        "Pretendard-SemiBold": require("@/assets/fonts/Pretendard-SemiBold.otf"),
        "Pretendard-Regular": require("@/assets/fonts/Pretendard-Regular.otf"),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <AuthProvider>
            <UIProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <ThemeProvider
                        value={
                            colorScheme === "dark" ? DarkTheme : DefaultTheme
                        }
                    >
                        <Stack>
                            <Stack.Screen
                                name="(tabs)"
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="(screens)/friends"
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="(auth)/login"
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="index"
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen name="+not-found" />
                        </Stack>
                        <StatusBar style="auto" />
                        <GlobalModal />
                        <GlobalSnackbar />
                    </ThemeProvider>
                </GestureHandlerRootView>
            </UIProvider>
        </AuthProvider>
    );
}
