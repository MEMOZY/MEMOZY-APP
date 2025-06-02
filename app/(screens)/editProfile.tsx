import { getUser, patchUser } from "@/api/user";
import { ImageIcon } from "@/assets/images/icons";
import PageLayout from "@/components/common/PageLayout";
import { ThemedText } from "@/components/common/ThemedText";
import { Colors } from "@/constants/Colors";
import { useUI } from "@/hooks/useUI";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import {
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getPresignedUrls, uploadToPresignedUrl } from "@/api/file";

export default function EditProfileScreen() {
    const [newNickname, setNewNickname] = useState<string>("");
    const [newProfileImage, setNewProfileImage] =
        useState<ImagePicker.ImagePickerAsset | null>(null);
    const { showSnackbar } = useUI();
    const queryClient = useQueryClient();

    const { data: user, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
    });

    const handleSelectProfileImage = async () => {
        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            showSnackbar({
                message: "사진 접근 권한이 필요합니다",
                color: Colors.red,
            });
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            const asset = result.assets[0];

            setNewProfileImage(asset); // 실제 적용도 가능
        }
    };

    const isNicknameChanged = newNickname && user?.nickname !== newNickname;
    const isProfileImageChanged =
        newProfileImage && user?.profileImageUrl !== newProfileImage.uri;

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
                            setNewProfileImage(null);
                        }}
                        disabled={!isNicknameChanged && !isProfileImageChanged}
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
                    <View style={{ position: "relative" }}>
                        <TouchableOpacity onPress={handleSelectProfileImage}>
                            <Image
                                source={{
                                    uri:
                                        newProfileImage?.uri ||
                                        user.profileImageUrl,
                                }}
                                style={styles.profileimage}
                            />

                            {/* 카메라 아이콘 오버레이 */}
                            <View style={styles.cameraIconContainer}>
                                <ImageIcon style={styles.cameraIcon} />
                            </View>
                        </TouchableOpacity>
                    </View>

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
                            let newProfileImageUrl = user.profileImageUrl;

                            if (isProfileImageChanged && newProfileImage) {
                                const presigned = await getPresignedUrls(
                                    [{ filename: newProfileImage.fileName! }],
                                    "PROFILE_IMAGE"
                                );
                                const { preSignedUrl, fileKey } = presigned[0];

                                await uploadToPresignedUrl(
                                    [
                                        {
                                            uri: newProfileImage.uri!,
                                            filename: newProfileImage.fileName!,
                                        },
                                    ],
                                    [{ preSignedUrl, fileKey }]
                                );

                                newProfileImageUrl = preSignedUrl;
                            }

                            await patchUser({
                                email: user.email,
                                phoneNumber: user.phoneNumber,
                                nickname: isNicknameChanged
                                    ? newNickname
                                    : user.nickname,
                                profileImageUrl: isProfileImageChanged
                                    ? newProfileImageUrl
                                    : user.profileImageUrl,
                            });

                            queryClient.invalidateQueries({
                                queryKey: ["user"],
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
    cameraIconContainer: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.1)", // 반투명 배경
        borderRadius: 120,
        width: 120,
        height: 120,
        alignItems: "center",
        justifyContent: "center",
    },

    cameraIcon: {
        opacity: 0.8,
        tintColor: Colors.gray1, // 연하게 보이게
    },
});
