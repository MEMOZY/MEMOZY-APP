import { Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../common/ThemedText";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { useUI } from "@/hooks/useUI";

interface AddLogButtonProps {
    onPress?: () => void;
}

export default function AddLogButton({ onPress }: AddLogButtonProps) {
    const { showModal, hideModal } = useUI();
    async function handlePress() {
        if (onPress) {
            onPress();
            return;
        }

        const mediaPermission = await MediaLibrary.getPermissionsAsync();
        const locationPermission =
            await Location.getForegroundPermissionsAsync();

        const isMediaGranted = mediaPermission.granted;
        const isLocationGranted = locationPermission.granted;
        const canAskMedia = mediaPermission.canAskAgain;
        const canAskLocation = locationPermission.canAskAgain;

        // 둘 다 권한 있는 경우
        if (isMediaGranted && isLocationGranted) {
            router.push("/(chat-flow)/select");
            return;
        }

        // 권한 재요청 가능할 경우 요청
        if (canAskMedia || canAskLocation) {
            const [mediaStatus, locationStatus] = await Promise.all([
                MediaLibrary.requestPermissionsAsync(),
                Location.requestForegroundPermissionsAsync(),
            ]);

            if (
                mediaStatus.status === "granted" &&
                locationStatus.status === "granted"
            ) {
                router.push("/(chat-flow)/select");
                return;
            }
        }

        // 권한 거부된 경우 설정 이동 유도
        showModal({
            title: "접근 권한 요청",
            subtitle:
                "서비스 이용을 위해 갤러리와 위치 권한을 허용해야 합니다.",
            confirmText: "설정으로 이동",
            color: Colors.gray4,
            onConfirm: () => {
                Linking.openSettings();
                hideModal();
            },
        });
    }
    return (
        <TouchableOpacity
            onPress={() => {
                handlePress();
            }}
        >
            <View style={styles.container}>
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

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: Colors.gray2,
        justifyContent: "center",
        paddingLeft: 20,
        borderRadius: 8,
    },
});
