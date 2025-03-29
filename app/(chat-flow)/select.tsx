import PageLayout from "@/components/common/PageLayout";
import { ThemedText } from "@/components/common/ThemedText";
import { Colors } from "@/constants/Colors";

export default function SelectScreen() {
    return (
        <PageLayout
            headerTitle="기록할 사진 선택"
            headerRight={
                <ThemedText
                    type="body2b"
                    lightColor={Colors.gray4}
                    darkColor={Colors.gray4}
                >
                    (0/30)
                </ThemedText>
            }
            hasBack
            backText="취소"
        >
            <ThemedText>123</ThemedText>
        </PageLayout>
    );
}
