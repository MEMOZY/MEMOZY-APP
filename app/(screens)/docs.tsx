import PageLayout from "@/components/common/PageLayout";
import Titled from "@/components/common/Titled";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

import Markdown from "react-native-markdown-display";
import { Colors } from "@/constants/Colors";

export default function DocsScreen() {
    const { tab } = useLocalSearchParams();
    // privacy = 개인정보 처리방침
    // terms = 이용 약관
    // license = 오픈소스 라이센스
    const title =
        {
            privacy: "개인정보 처리방침",
            terms: "이용 약관",
            license: "오픈소스 라이센스",
        }[tab as string] || "개인정보 처리방침";

    const md =
        {
            privacy: "# 개인정보 처리방침\n\n개인정보 처리방침 내용",
            terms: "# 이용 약관\n\n이용 약관 내용",
            license: "# 오픈소스 라이센스\n\n오픈소스 라이센스 내용",
        }[tab as string] || "개인정보 처리방침 내용";

    return (
        <PageLayout
            headerTitle={title}
            titleAlign="left"
            hasBack
            style={{
                justifyContent: "space-between",
            }}
            scrollView
        >
            <Titled title={title}>
                <SettingsSection>
                    <Markdown
                        style={{
                            body: {
                                fontFamily: "Pretendard-Regular",
                                fontSize: 14,
                                width: "100%",
                            },
                            text: {
                                color: Colors.gray6,
                            },
                            strong: {
                                fontFamily: "Pretendard-SemiBold",
                            },
                            heading1: {
                                fontFamily: "Pretendard-Bold",
                                fontSize: 20,
                                paddingVertical: 6,
                            },
                            heading2: {
                                fontFamily: "Pretendard-Bold",
                                fontSize: 18,
                                paddingVertical: 4,
                            },
                            heading3: {
                                fontFamily: "Pretendard-Bold",
                                fontSize: 16,
                                paddingVertical: 2,
                            },
                            heading4: {
                                fontFamily: "Pretendard-Bold",
                                fontSize: 14,
                                paddingVertical: 1,
                            },
                        }}
                    >
                        {md}
                    </Markdown>
                </SettingsSection>
            </Titled>
        </PageLayout>
    );
}
