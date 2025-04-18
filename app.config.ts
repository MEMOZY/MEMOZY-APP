import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
    name: "memozy",
    slug: "memozy",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "memozy",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
        supportsTablet: true,
        bundleIdentifier: "com.tym.memozy",
        infoPlist: {
            ITSAppUsesNonExemptEncryption: false,
            NSAppTransportSecurity: {
                NSAllowsArbitraryLoads: true,
            },
        },
    },
    android: {
        adaptiveIcon: {
            foregroundImage: "./assets/images/adaptive-icon.png",
            backgroundColor: "#F9FAFB",
        },
        package: "com.tym.memozy",
    },
    web: {
        bundler: "metro",
        output: "static",
        favicon: "./assets/images/favicon.png",
    },
    plugins: [
        "expo-router",
        [
            "expo-splash-screen",
            {
                image: "./assets/images/splash-icon.png",
                imageWidth: 200,
                resizeMode: "contain",
                backgroundColor: "#F9FAFB",
            },
        ],
        [
            "expo-media-library",
            {
                photosPermission:
                    "당신의 사진에 접근할 수 있도록 권한을 허용해주세요.",
                savePhotosPermission: "Allow $(PRODUCT_NAME) to save photos.",
                isAccessMediaLocationEnabled: true,
            },
        ],
        [
            "expo-build-properties",
            {
                android: {
                    extraMavenRepos: [
                        "https://devrepo.kakao.com/nexus/content/groups/public/",
                    ],
                    useCleartextTraffic: true,
                },
            },
        ],
        [
            "@react-native-kakao/core",
            {
                nativeAppKey: process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY,
                android: {
                    authCodeHandlerActivity: true,
                },
                ios: {
                    handleKakaoOpenUrl: true,
                },
            },
        ],
    ],
    experiments: {
        typedRoutes: true,
    },
    extra: {
        router: {
            origin: false,
        },
        eas: {
            projectId: "b0e67949-9c29-4b4e-88ee-057a0612d880",
        },
    },
});
