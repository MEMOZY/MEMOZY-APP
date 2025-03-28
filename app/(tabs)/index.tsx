import { PlusIcon } from "@/assets/images/icons";
import PageLayout from "@/components/common/PageLayout";
import { ThemedText } from "@/components/common/ThemedText";
import Titled from "@/components/common/Titled";
import FriendList from "@/components/friend/FriendList";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
    return (
        <PageLayout headerTitle="Memozy" titleAlign="left">
            <Titled title="Friends">
                <FriendList
                    friends={[
                        "https://example.com/image1.jpg",
                        "https://example.com/image2.jpg",
                        "https://example.com/image3.jpg",
                    ]}
                    onAddFriend={() => {
                        console.log("Add friend pressed");
                    }}
                />
            </Titled>
        </PageLayout>
    );
}

const styles = StyleSheet.create({});
