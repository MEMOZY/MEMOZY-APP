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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider } from "@/contexts/AuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { UIProvider } from "@/contexts/UIContext";
import { GlobalModal } from "@/components/common/GlobalModal";
import { GlobalSnackbar } from "@/components/common/GlobalSnackbar";
import { initializeKakaoSDK } from "@react-native-kakao/core";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import * as Notifications from "expo-notifications";
import { NotificationsProvider } from "@/contexts/NotificationProvider";

// 사전 로딩을 위해 스플래시 스크린을 숨기지 않음
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        "Pretendard-Bold": require("@/assets/fonts/Pretendard-Bold.otf"),
        "Pretendard-SemiBold": require("@/assets/fonts/Pretendard-SemiBold.otf"),
        "Pretendard-Regular": require("@/assets/fonts/Pretendard-Regular.otf"),
    });
    const queryClient = new QueryClient();

    useEffect(() => {
        initializeKakaoSDK(process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY || "");
        GoogleSignin.configure({
            iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
        });
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <NotificationsProvider>
                    <UIProvider>
                        <GestureHandlerRootView style={{ flex: 1 }}>
                            <ThemeProvider
                                value={
                                    colorScheme === "dark"
                                        ? DarkTheme
                                        : DefaultTheme
                                }
                            >
                                <Stack>
                                    <Stack.Screen
                                        name="(tabs)"
                                        options={{ headerShown: false }}
                                    />
                                    <Stack.Screen
                                        name="(chat-flow)"
                                        options={{ headerShown: false }}
                                    />
                                    <Stack.Screen
                                        name="(screens)/friends"
                                        options={{ headerShown: false }}
                                    />
                                    <Stack.Screen
                                        name="(screens)/editProfile"
                                        options={{ headerShown: false }}
                                    />
                                    <Stack.Screen
                                        name="(screens)/docs"
                                        options={{ headerShown: false }}
                                    />
                                    <Stack.Screen
                                        name="(screens)/inquiry"
                                        options={{ headerShown: false }}
                                    />
                                    <Stack.Screen
                                        name="(screens)/search"
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
                                    <Stack.Screen
                                        name="+not-found"
                                        options={{ headerShown: false }}
                                    />
                                </Stack>
                                <StatusBar style="dark" />
                                <GlobalModal />
                                <GlobalSnackbar />
                            </ThemeProvider>
                        </GestureHandlerRootView>
                    </UIProvider>
                </NotificationsProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
}
