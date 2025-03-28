import PageLayout from "@/components/common/PageLayout";
import Titled from "@/components/common/Titled";
import { CopyIcon } from "@/assets/images/icons";
import { Colors } from "@/constants/Colors";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { SettingsItem } from "@/components/settings/SettingsItem";
import { Divider } from "@/components/common/Divider";
import { useAuth } from "@/contexts/AuthContext";
import { useUI } from "@/hooks/useUI";
import * as Clipboard from "expo-clipboard";
import { router } from "expo-router";

export default function SettingsScreen() {
    const { logout } = useAuth();
    const { showModal, showSnackbar } = useUI();
    return (
        <PageLayout
            headerTitle="설정"
            titleAlign="left"
            style={{ gap: 20 }}
            scrollView
        >
            <Titled title="유저 정보">
                <SettingsSection>
                    <SettingsItem
                        label="프로필 수정"
                        onPress={() => router.push("/editProfile")}
                    />
                    <Divider />
                    <SettingsItem
                        label="내 코드"
                        value="ABCD1234"
                        onPress={async () => {
                            await Clipboard.setStringAsync("ABCD1234").then(
                                () => {
                                    showSnackbar({
                                        message: "코드가 복사되었습니다",
                                        color: Colors.green,
                                    });
                                }
                            );
                        }}
                        rightIcon={<CopyIcon />}
                    />
                </SettingsSection>
            </Titled>

            <Titled title="앱 정보">
                <SettingsSection>
                    <SettingsItem
                        label="개인정보 처리방침"
                        onPress={() => {
                            router.push({
                                pathname: "/docs",
                                params: { tab: "privacy" },
                            });
                        }}
                    />
                    <Divider />
                    <SettingsItem
                        label="이용 약관"
                        onPress={() => {
                            router.push({
                                pathname: "/docs",
                                params: { tab: "terms" },
                            });
                        }}
                    />
                    <Divider />
                    <SettingsItem
                        label="오픈소스 라이센스"
                        onPress={() => {
                            router.push({
                                pathname: "/docs",
                                params: { tab: "license" },
                            });
                        }}
                    />
                </SettingsSection>
            </Titled>

            <SettingsSection>
                <SettingsItem label="문의 하기" onPress={() => {}} />
                <Divider />
                <SettingsItem label="리뷰 남기기" onPress={() => {}} />
            </SettingsSection>

            <SettingsSection>
                <SettingsItem
                    label="로그아웃"
                    onPress={() => {
                        showModal({
                            title: "로그아웃",
                            subtitle: "Memozy 앱에서 로그아웃 합니다",
                            confirmText: "로그아웃",
                            color: Colors.gray5,
                            onConfirm: () => {
                                logout();
                            },
                        });
                    }}
                    color={Colors.red}
                />
            </SettingsSection>

            <SettingsSection>
                <SettingsItem
                    label="회원 탈퇴"
                    onPress={() => {
                        showModal({
                            title: "정말 탈퇴하시겠습니까?",
                            subtitle: "삭제한 계정은 복구할 수 없습니다",
                            confirmText: "회원 탈퇴",
                            color: Colors.red,
                            onConfirm: () => {
                                logout();
                            },
                        });
                    }}
                    color={Colors.red}
                />
            </SettingsSection>
        </PageLayout>
    );
}
