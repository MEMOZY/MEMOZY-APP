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
    backgroundColor: "#F9FAFB",
    ios: {
        supportsTablet: true,
        bundleIdentifier: "com.tym.memozy",
        usesAppleSignIn: true,
        buildNumber: "2025060506",
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
                    "Memozy는 선택한 사진을 기반으로 AI가 자동으로 감정과 내용을 분석하여 일기 형식으로 정리해드립니다.",
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
        [
            "expo-location",
            {
                locationAlwaysAndWhenInUsePermission:
                    "Memozy는 선택한 사진의 위치 정보를 분석해서 일기에 장소와 관련된 내용을 자동으로 추가합니다.",
                locationAlwaysPermission:
                    "Memozy는 선택한 사진의 위치 정보를 분석해서 일기에 장소와 관련된 내용을 자동으로 추가합니다.",
                locationWhenInUsePermission:
                    "Memozy는 선택한 사진의 위치 정보를 분석해서 일기에 장소와 관련된 내용을 자동으로 추가합니다.",
            },
        ],
        [
            "@react-native-google-signin/google-signin",
            {
                iosUrlScheme: process.env.EXPO_PUBLIC_GOOGLE_IOS_URL_SCHEME,
            },
        ],
        ["expo-apple-authentication"],
        [
            "expo-notifications",
            {
                icon: "./assets/images/favicon.png",
                color: "#ffffff",
                defaultChannel: "default",
                enableBackgroundRemoteNotifications: true,
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
