import PageLayout from "@/components/common/PageLayout";
import { ThemedText } from "@/components/common/ThemedText";
import { Colors } from "@/constants/Colors";
import { useUI } from "@/hooks/useUI";
import { router } from "expo-router";
import { useState } from "react";
import {
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function EditProfileScreen() {
    const [currentNickname, setCurrentNickname] = useState("닉네임");
    const [newNickname, setNewNickname] = useState("닉네임");
    const { showSnackbar } = useUI();

    const isNicknameChanged = currentNickname !== newNickname;

    return (
        <PageLayout
            headerTitle="프로필 수정"
            titleAlign="left"
            hasBack
            style={{
                justifyContent: "space-between",
                alignItems: "center",
            }}
            headerRight={
                <TouchableOpacity
                    onPress={() => {
                        setNewNickname(currentNickname);
                    }}
                    disabled={!isNicknameChanged}
                >
                    <ThemedText
                        type="body2b"
                        lightColor={
                            isNicknameChanged ? Colors.red : Colors.gray3
                        }
                        darkColor={
                            isNicknameChanged ? Colors.red : Colors.gray3
                        }
                    >
                        되돌리기
                    </ThemedText>
                </TouchableOpacity>
            }
        >
            <View />
            <View style={{ alignItems: "center", gap: 20 }}>
                <Image
                    source={{
                        uri: "https://cdn.discordapp.com/attachments/1094232715097129522/1158700451736825916/image.png",
                    }}
                    style={{
                        width: 120,
                        height: 120,
                        borderRadius: 120,
                        backgroundColor: Colors.gray3,
                    }}
                />
                <View
                    style={{
                        height: 50,
                        width: 150,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: Colors.gray2,
                        borderRadius: 12,
                    }}
                >
                    <TextInput
                        placeholder="닉네임을 입력하세요"
                        placeholderTextColor={Colors.gray4}
                        value={newNickname}
                        onChangeText={(text) => setNewNickname(text)}
                        style={{
                            width: "100%",
                            height: "100%",
                            textAlign: "center",
                            color: Colors.gray5,
                            fontFamily: "Pretendard-SemiBold",
                            fontSize: 20,
                        }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoComplete="off"
                        autoFocus={false}
                        returnKeyType="done"
                        inputMode="text"
                        maxLength={8}
                    />
                </View>
            </View>
            <TouchableOpacity
                style={{ width: "100%" }}
                disabled={!isNicknameChanged}
                onPress={() => {
                    if (isNicknameChanged) {
                        setCurrentNickname(newNickname);
                        showSnackbar({
                            message: "닉네임이 변경되었습니다",
                            color: Colors.green,
                        });
                        router.back();
                    }
                }}
            >
                <View
                    style={{
                        height: 58,
                        width: "100%",
                        backgroundColor: isNicknameChanged
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
                        저장
                    </ThemedText>
                </View>
            </TouchableOpacity>
        </PageLayout>
    );
}

const styles = StyleSheet.create({});
