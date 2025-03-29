import { DownChevronIcon } from "@/assets/images/icons";
import Button from "@/components/common/Button";
import PageLayout from "@/components/common/PageLayout";
import { ThemedText } from "@/components/common/ThemedText";
import Titled from "@/components/common/Titled";
import FriendList from "@/components/friend/FriendList";
import { DateRangePicker } from "@/components/save/DateRangePicker";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function SaveScreen() {
    return (
        <PageLayout
            headerTitle="저장"
            backText="이전"
            hasBack
            style={{
                justifyContent: "space-between",
            }}
        >
            <View
                style={{
                    padding: 20,
                    gap: 20,
                    backgroundColor: Colors.white,
                    borderRadius: 12,
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Titled title="제목">
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="제목을 입력하세요"
                            placeholderTextColor={Colors.gray4}
                            style={styles.input}
                            autoCapitalize="none"
                            autoCorrect={false}
                            autoComplete="off"
                            maxLength={20}
                        />
                    </View>
                </Titled>
                <DateRangePicker />

                <Titled title="카테고리">
                    <TouchableOpacity>
                        <View
                            style={{
                                backgroundColor: Colors.white,
                                flexDirection: "row",
                                gap: 4,
                                alignItems: "center",
                                borderRadius: 20,
                                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                                paddingHorizontal: 16,
                                height: 34,
                                alignSelf: "flex-start",
                            }}
                        >
                            <ThemedText
                                lightColor={Colors.gray4}
                                darkColor={Colors.gray4}
                                type="body2b"
                            >
                                없음
                            </ThemedText>
                            <DownChevronIcon />
                        </View>
                    </TouchableOpacity>
                </Titled>

                <Titled title="함께하는 친구">
                    <FriendList
                        friends={[]}
                        onAddFriend={() => {
                            console.log("Add friend");
                        }}
                    />
                </Titled>
            </View>
            <Button
                title="저장하기"
                onPress={() => {
                    router.replace("/(tabs)");
                }}
            />
        </PageLayout>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        height: 42,
        backgroundColor: Colors.white,
        borderRadius: 12,
        paddingHorizontal: 12,
        justifyContent: "center",
        alignSelf: "flex-start",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        minWidth: 120,
    },
    input: {
        fontFamily: "Pretendard-Regular",
        fontSize: 13,
        color: Colors.gray6,
        flex: 1,
    },
});
