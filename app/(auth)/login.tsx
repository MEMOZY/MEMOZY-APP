import { apiTest, getSocialAccessToken, getToken } from "@/api/auth";
import { AppleIcon, GoogleIcon, KakaoIcon, Logo } from "@/assets/images/icons";
import PageLayout from "@/components/common/PageLayout";
import { ThemedText } from "@/components/common/ThemedText";
import SocialLoginButton from "@/components/login/SocialLoginButton";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { Platform, StyleSheet, View } from "react-native";

export default function LoginScreen() {
    const { login } = useAuth();

    const handleLogin = async (platform: "GOOGLE" | "APPLE" | "KAKAO") => {
        try {
            const socialAccessToken = await getSocialAccessToken(platform);
            if (!socialAccessToken) {
                throw new Error("소셜 로그인에 실패했습니다.");
            }
            console.log(socialAccessToken);
            const { accessToken, refreshToken } = await getToken(
                platform,
                socialAccessToken
            );
            if (!accessToken || !refreshToken) {
                throw new Error("로그인에 실패했습니다.");
            }
            console.log(accessToken, refreshToken);
            await login(accessToken, refreshToken);
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <PageLayout style={styles.containerStyle}>
            <View />
            <View>
                <Logo />
                <ThemedText type="title" style={{ marginTop: 20 }}>
                    Memory for lazy
                </ThemedText>
            </View>
            <View style={{ width: "100%", gap: 20 }}>
                <SocialLoginButton
                    icon={<KakaoIcon />}
                    label="카카오 계정으로 로그인"
                    backgroundColor="#FFE100"
                    textColor="black"
                    onPress={() => handleLogin("KAKAO")}
                />
                <SocialLoginButton
                    icon={<GoogleIcon />}
                    label="구글 계정으로 로그인"
                    backgroundColor={Colors.white}
                    textColor="black"
                    onPress={() => {
                        apiTest();
                    }}
                />
                <SocialLoginButton
                    icon={<AppleIcon />}
                    label="애플 계정으로 로그인"
                    backgroundColor={Colors.gray6}
                    textColor="white"
                    onPress={() => {
                        login(
                            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
                            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
                        );
                    }}
                />
            </View>
        </PageLayout>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        justifyContent: "space-between",
        alignItems: "center",
        ...(Platform.OS === "android" && { marginVertical: 60 }),
    },
});
