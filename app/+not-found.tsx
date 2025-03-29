import { StyleSheet, TouchableOpacity } from "react-native";

import PageLayout from "@/components/common/PageLayout";
import { ThemedText } from "@/components/common/ThemedText";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

export default function NotFoundScreen() {
    return (
        <PageLayout headerTitle="404 Not Found" style={styles.container}>
            <ThemedText type="body1b">페이지를 찾을 수 없습니다.</ThemedText>
            <TouchableOpacity onPress={() => router.back()}>
                <ThemedText
                    type="body2"
                    lightColor={Colors.blue}
                    darkColor={Colors.blue}
                >
                    돌아가기
                </ThemedText>
            </TouchableOpacity>
        </PageLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
});
