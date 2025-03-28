import { ImageIcon } from "@/assets/images/icons";
import PageLayout from "@/components/common/PageLayout";
import { ThemedText } from "@/components/common/ThemedText";
import Titled from "@/components/common/Titled";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { Colors } from "@/constants/Colors";
import { useUI } from "@/hooks/useUI";
import { router } from "expo-router";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export default function inQuiryScreen() {
    const { showSnackbar } = useUI();
    const isContentFilled = false;

    return (
        <PageLayout
            headerTitle="문의하기"
            titleAlign="left"
            hasBack
            style={{
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <View style={{ gap: 20, width: "100%" }}>
                <Titled title="제목">
                    <SettingsSection>
                        <TextInput
                            placeholder="문의 제목을 입력하세요"
                            style={styles.textStyle}
                        />
                    </SettingsSection>
                </Titled>
                <Titled title="내용">
                    <SettingsSection>
                        <TextInput
                            placeholder="문의 할 내용을 입력하세요"
                            multiline
                            style={styles.textStyle}
                        />
                    </SettingsSection>
                </Titled>
                <View style={{ gap: 10 }}>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <ThemedText type="body2b">첨부파일</ThemedText>
                        <ThemedText
                            type="body2b"
                            lightColor={Colors.gray4}
                            darkColor={Colors.gray4}
                        >
                            ( 0 / 3 )
                        </ThemedText>
                    </View>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={styles.imageContainer}>
                            <ImageIcon />
                        </View>
                    </View>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => {
                    showSnackbar({ message: "문의하기는 현재 준비중입니다." });
                    router.back();
                }}
                style={{
                    width: "100%",
                }}
                disabled={!isContentFilled}
            >
                <View
                    style={{
                        height: 58,
                        width: "100%",
                        backgroundColor: isContentFilled
                            ? Colors.gray5
                            : Colors.gray4,
                        borderRadius: 12,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <ThemedText
                        type="body1b"
                        lightColor={Colors.gray1}
                        darkColor={Colors.gray1}
                    >
                        전송
                    </ThemedText>
                </View>
            </TouchableOpacity>
        </PageLayout>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 13,
        fontFamily: "Pretendard-Regular",
        color: Colors.gray5,
        paddingTop: 0,
        marginTop: 0,
    },
    imageContainer: {
        width: 80,
        height: 80,
        backgroundColor: Colors.gray2,
        borderRadius: 12,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        alignItems: "center",
        justifyContent: "center",
    },
});
