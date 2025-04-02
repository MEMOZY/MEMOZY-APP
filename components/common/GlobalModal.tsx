import { useUI } from "@/hooks/useUI";
import {
    Modal,
    StyleSheet,
    TouchableOpacity,
    View,
    TouchableWithoutFeedback,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/Colors";

export const GlobalModal = () => {
    const { modal, hideModal } = useUI();

    if (!modal.visible) return null;

    return (
        <Modal transparent={true} visible={modal.visible} animationType="fade">
            <TouchableWithoutFeedback onPress={hideModal}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContainer}>
                            <View style={styles.titleContainer}>
                                <ThemedText type="body1b">
                                    {modal.title}
                                </ThemedText>
                                <ThemedText
                                    type="body2b"
                                    lightColor={Colors.gray4}
                                    darkColor={Colors.gray4}
                                >
                                    {modal.subtitle}
                                </ThemedText>
                            </View>
                            <View style={styles.buttonsLayout}>
                                <TouchableOpacity
                                    onPress={() => {
                                        modal.onConfirm?.();
                                        hideModal();
                                    }}
                                >
                                    <View
                                        style={[
                                            styles.confirmButton,
                                            {
                                                backgroundColor:
                                                    modal.color || Colors.gray5,
                                            },
                                        ]}
                                    >
                                        <ThemedText
                                            type="body2b"
                                            lightColor={Colors.white}
                                            darkColor={Colors.white}
                                        >
                                            {modal.confirmText}
                                        </ThemedText>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        modal.onCancel?.();
                                        hideModal();
                                    }}
                                >
                                    <ThemedText
                                        type="body2b"
                                        lightColor={Colors.gray4}
                                        darkColor={Colors.gray4}
                                        style={styles.textCenter}
                                    >
                                        {modal.cancelText || "취소하기"}
                                    </ThemedText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(61, 66, 72, 0.2)",
    },
    modalContainer: {
        padding: 20,
        backgroundColor: Colors.white,
        borderRadius: 12,
        width: "80%",
        gap: 20,
    },
    titleContainer: {
        alignItems: "center",
        gap: 8,
    },
    textCenter: {
        textAlign: "center",
    },
    buttonsLayout: {
        gap: 10,
    },
    confirmButton: {
        height: 42,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
    },
});
