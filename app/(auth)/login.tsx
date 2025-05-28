import { getSocialAccessToken, getTestToken, getToken } from "@/api/auth";
import { AppleIcon, GoogleIcon, KakaoIcon, Logo } from "@/assets/images/icons";
import PageLayout from "@/components/common/PageLayout";
import { ThemedText } from "@/components/common/ThemedText";
import SocialLoginButton from "@/components/login/SocialLoginButton";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { StyleSheet, View } from "react-native";

export default function LoginScreen() {
    const { login } = useAuth();

    const handleLogin = async (platform: "GOOGLE" | "APPLE" | "KAKAO") => {
        try {
            const { socialToken, name } = await getSocialAccessToken(platform);
            if (!socialToken) {
                throw new Error("소셜 로그인에 실패했습니다.");
            }
            console.log(socialToken);
            const { accessToken, refreshToken } = await getToken(
                platform,
                socialToken,
                name
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

    const handleTestLogin = async () => {
        try {
            const { accessToken, refreshToken } = await getTestToken();
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
                        handleLogin("GOOGLE");
                    }}
                />
                <SocialLoginButton
                    icon={<AppleIcon />}
                    label="애플 계정으로 로그인"
                    backgroundColor={Colors.gray6}
                    textColor="white"
                    onPress={() => {
                        handleLogin("APPLE");
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
    },
});
