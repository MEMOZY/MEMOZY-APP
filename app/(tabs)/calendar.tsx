import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import PageLayout from "@/components/common/PageLayout";
import { ThemedText } from "@/components/common/ThemedText";
import { Colors } from "@/constants/Colors";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { CalendarList } from "react-native-calendars";

export default function CalendarScreen() {
    return (
        <PageLayout>
            <CalendarList
                style={{
                    borderRadius: 12,
                    boxShadow: "0 0 4px rgba(0, 0, 0, 0.1)",
                    height: "90%",
                    width: Dimensions.get("window").width - 20,
                    alignSelf: "center",
                }}
                theme={{
                    backgroundColor: Colors.white,
                }}
                horizontal={true}
                pagingEnabled={true}
                hideExtraDays={false}
                calendarWidth={Dimensions.get("window").width - 20}
                customHeader={CalendarHeader}
                dayComponent={({ date, state, marking }) => {
                    return (
                        <View style={styles.dayContainer}>
                            <ThemedText
                                type="caption"
                                style={
                                    state === "disabled"
                                        ? styles.dayDisabled
                                        : {}
                                }
                            >
                                {date!.day}
                            </ThemedText>
                            <View style={styles.dayImageContainer}>
                                <Image
                                    style={styles.dayImage}
                                    source={{
                                        uri: "https://example.com/image.png",
                                    }}
                                />
                                <View style={styles.dayImageOverlay}>
                                    <ThemedText
                                        type="body1b"
                                        style={{ color: Colors.white }}
                                    >
                                        +2
                                    </ThemedText>
                                </View>
                            </View>
                        </View>
                    );
                }}
            />
        </PageLayout>
    );
}

const styles = StyleSheet.create({
    dayContainer: {
        backgroundColor: Colors.gray1,
        width: "80%",
        minHeight: 50,
        alignItems: "center",
        padding: 4,
        borderRadius: 8,
        boxShadow: "0 0 4px rgba(0, 0, 0, 0.1)",
        gap: 2,
    },
    dayDisabled: {
        color: Colors.gray3,
    },
    dayImageContainer: {
        width: 32,
        height: 32,
        borderRadius: 4,
    },
    dayImage: {
        width: "100%",
        height: "100%",
        borderRadius: 4,
        backgroundColor: Colors.gray2,
    },
    dayImageOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: 4,
    },
});
