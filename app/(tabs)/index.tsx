import { useAuth } from "@/contexts/AuthContext";
import { Button, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
    const { logout } = useAuth();
    return (
        <View>
            <Text>Main Page</Text>
            <Button title="로그아웃" onPress={logout} />
        </View>
    );
}

const styles = StyleSheet.create({});
