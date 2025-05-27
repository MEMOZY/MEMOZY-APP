import { getUser, patchUser } from "@/api/user";
import PageLayout from "@/components/common/PageLayout";
import { ThemedText } from "@/components/common/ThemedText";
import { Colors } from "@/constants/Colors";
import { useUI } from "@/hooks/useUI";
import { useQuery } from "@tanstack/react-query";
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
    const [newNickname, setNewNickname] = useState<string>("");
    const [newProfileImage, setNewProfileImage] = useState<string>("");
    const { showSnackbar } = useUI();

    const { data: user, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
    });

    const isNicknameChanged = newNickname && user?.nickname !== newNickname;
    const isProfileImageChanged =
        newProfileImage && user?.profileImageUrl !== newProfileImage;

    return (
        !isLoading &&
        user && (
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
                            setNewNickname("");
                        }}
                        disabled={!isNicknameChanged}
                    >
                        <ThemedText
                            type="body2b"
                            lightColor={
                                isNicknameChanged || isProfileImageChanged
                                    ? Colors.red
                                    : Colors.gray3
                            }
                            darkColor={
                                isNicknameChanged || isProfileImageChanged
                                    ? Colors.red
                                    : Colors.gray3
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
                            uri: user.profileImageUrl,
                        }}
                        style={styles.profileimage}
                    />
                    <View style={styles.nicknameContainer}>
                        <TextInput
                            placeholder={user.nickname}
                            placeholderTextColor={Colors.gray4}
                            value={newNickname}
                            onChangeText={(text) => setNewNickname(text)}
                            style={styles.nicknameInput}
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
                    disabled={!isNicknameChanged && !isProfileImageChanged}
                    onPress={async () => {
                        if (isNicknameChanged || isProfileImageChanged) {
                            await patchUser({
                                email: user.email,
                                phoneNumber: user!.phoneNumber,
                                nickname: isNicknameChanged
                                    ? newNickname
                                    : user.nickname,
                                profileImageUrl: isProfileImageChanged
                                    ? newProfileImage
                                    : user.profileImageUrl,
                            });
                            showSnackbar({
                                message: "변경사항이 저장되었습니다",
                                color: Colors.green,
                            });
                            router.back();
                        }
                    }}
                >
                    <View
                        style={[
                            styles.saveButton,
                            {
                                backgroundColor: isNicknameChanged
                                    ? Colors.gray5
                                    : Colors.gray4,
                            },
                        ]}
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
        )
    );
}

const styles = StyleSheet.create({
    profileimage: {
        width: 120,
        height: 120,
        borderRadius: 120,
        backgroundColor: Colors.gray3,
    },
    nicknameContainer: {
        height: 50,
        width: 150,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.gray2,
        borderRadius: 12,
    },
    nicknameInput: {
        width: "100%",
        height: "100%",
        textAlign: "center",
        color: Colors.gray5,
        fontFamily: "Pretendard-SemiBold",
        fontSize: 20,
    },
    saveButton: {
        height: 58,
        width: "100%",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
});
