import { AppleIcon, GoogleIcon, KakaoIcon, Logo } from "@/assets/images/icons";
import PageLayout from "@/components/common/PageLayout";
import { ThemedText } from "@/components/common/ThemedText";
import SocialLoginButton from "@/components/login/SocialLoginButton";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { StyleSheet, View } from "react-native";

export default function LoginScreen() {
    const { login } = useAuth();

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
                    onPress={() => {
                        login();
                    }}
                />
                <SocialLoginButton
                    icon={<GoogleIcon />}
                    label="구글 계정으로 로그인"
                    backgroundColor={Colors.white}
                    textColor="black"
                    onPress={() => {
                        login();
                    }}
                />
                <SocialLoginButton
                    icon={<AppleIcon />}
                    label="애플 계정으로 로그인"
                    backgroundColor={Colors.gray6}
                    textColor="white"
                    onPress={() => {
                        login();
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
