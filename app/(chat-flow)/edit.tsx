import { TrashIcon } from "@/assets/images/icons";
import PageLayout from "@/components/common/PageLayout";
import { ThemedText } from "@/components/common/ThemedText";
import LogCard from "@/components/edit/logCard";
import { Colors } from "@/constants/Colors";
import { useUI } from "@/hooks/useUI";
import { formatDate } from "@/utils/formatDate";
import { router } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function EditScreen() {
    const { showModal } = useUI();
    return (
        <PageLayout
            headerTitle="편집"
            hasBack
            backText="취소"
            scrollView
            onBack={() => {
                showModal({
                    title: "정말 취소하시겠습니까?",
                    subtitle: "진행 중인 작업이 모두 취소됩니다.",
                    confirmText: "확인",
                    cancelText: "돌아가기",
                    onConfirm: () => {
                        router.replace("/(tabs)");
                    },
                });
            }}
            headerRight={
                <TouchableOpacity
                    onPress={() => {
                        router.replace("/save");
                    }}
                >
                    <ThemedText
                        type="body1"
                        lightColor={Colors.gray6}
                        darkColor={Colors.gray6}
                    >
                        다음
                    </ThemedText>
                </TouchableOpacity>
            }
            style={{ gap: 20 }}
        >
            <View style={{ gap: 10 }}>
                <ThemedText type="body1b">{formatDate(new Date())}</ThemedText>
                <View style={{ gap: 20 }}>
                    <LogCard
                        imageUrl="https://example.com/image.jpg"
                        text="오늘은 정말 좋은 날이었어요!"
                        time={new Date()}
                    />
                </View>
            </View>
            <View style={{ gap: 10 }}>
                <ThemedText type="body1b">{formatDate(new Date())}</ThemedText>
                <View style={{ gap: 20 }}>
                    <LogCard
                        imageUrl="https://example.com/image.jpg"
                        text="오늘은 정말 좋은 날이었어요!"
                        time={new Date()}
                    />
                </View>
            </View>
            <View style={{ gap: 10 }}>
                <ThemedText type="body1b">{formatDate(new Date())}</ThemedText>
                <View style={{ gap: 20 }}>
                    <LogCard
                        imageUrl="https://example.com/image.jpg"
                        text="오늘은 정말 좋은 날이었어요!"
                        time={new Date()}
                    />
                </View>
            </View>
        </PageLayout>
    );
}

const styles = StyleSheet.create({});
