import { SendIcon, SkipIcon } from "@/assets/images/icons";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

interface ChatIconSwitchProps {
    showSend: boolean; // true면 SendIcon 보여주기
}

export default function ChatIconSwitch({ showSend }: ChatIconSwitchProps) {
    const sendOpacity = useRef(new Animated.Value(showSend ? 1 : 0)).current;
    const skipOpacity = useRef(new Animated.Value(showSend ? 0 : 1)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(sendOpacity, {
                toValue: showSend ? 1 : 0,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(skipOpacity, {
                toValue: showSend ? 0 : 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    }, [showSend]);

    return (
        <View style={styles.wrapper}>
            <Animated.View style={[styles.absolute, { opacity: skipOpacity }]}>
                <SkipIcon />
            </Animated.View>
            <Animated.View style={[styles.absolute, { opacity: sendOpacity }]}>
                <SendIcon />
            </Animated.View>
        </View>
    );
}
const styles = StyleSheet.create({
    wrapper: {
        width: 24,
        height: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    absolute: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
    },
});
