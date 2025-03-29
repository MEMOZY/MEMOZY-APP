import { Linking, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../common/ThemedText";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import * as MediaLibrary from "expo-media-library";
import { useUI } from "@/hooks/useUI";

export default function AddLogButton() {
    const { showModal, hideModal } = useUI();
    async function handlePress() {
        const { canAskAgain, granted } =
            await MediaLibrary.getPermissionsAsync();

        if (granted) {
            router.push("/(chat-flow)/select");
        } else if (canAskAgain) {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status === "granted") {
                router.push("/(chat-flow)/select");
            } else {
                showModal({
                    title: "갤러리 접근 권한 요청",
                    subtitle: "서비스 이용을 위해 권한을 허용해야 합니다.",
                    confirmText: "설정으로 이동",
                    color: Colors.gray4,
                    onConfirm: () => {
                        Linking.openSettings();
                        hideModal();
                    },
                });
            }
        } else {
            showModal({
                title: "갤러리  접근 권한 요청",
                subtitle: "서비스 이용을 위해 권한을 허용해야 합니다.",
                confirmText: "설정으로 이동",
                color: Colors.gray4,
                onConfirm: () => {
                    Linking.openSettings();
                    hideModal();
                },
            });
        }
    }
    return (
        <TouchableOpacity
            onPress={() => {
                handlePress();
            }}
        >
            <View
                style={{
                    height: 50,
                    backgroundColor: Colors.gray2,
                    justifyContent: "center",
                    paddingLeft: 20,
                    borderRadius: 8,
                }}
            >
                <ThemedText
                    type="body2b"
                    lightColor={Colors.light.tabIconDefault}
                    darkColor={Colors.dark.tabIconDefault}
                >
                    + 새로운 기록을 추가하세요
                </ThemedText>
            </View>
        </TouchableOpacity>
    );
}
