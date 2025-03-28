import { useAuth } from "@/contexts/AuthContext";
import { Button, StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {
    const { login } = useAuth();
    return (
        <View>
            <Text>Login Page</Text>
            <Button title="로그인" onPress={login} />
        </View>
    );
}

const styles = StyleSheet.create({});
