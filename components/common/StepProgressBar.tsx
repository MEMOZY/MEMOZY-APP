import { Colors } from "@/constants/Colors";
import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";

interface StepProgressProps {
    currentStep: number; // 현재 단계 (0 ~ totalSteps)
    totalSteps: number; // 총 단계 수
    barColor?: string;
}

export default function StepProgressBar({
    currentStep,
    totalSteps,
    barColor = Colors.gray6,
}: StepProgressProps) {
    const progress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const percentage = currentStep / totalSteps;

        Animated.timing(progress, {
            toValue: percentage,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [currentStep, totalSteps]);

    const widthInterpolated = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"],
    });

    return (
        <View style={styles.wrapper}>
            <Animated.View
                style={[
                    styles.bar,
                    { backgroundColor: barColor, width: widthInterpolated },
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        height: 4,
        backgroundColor: Colors.gray3,
        borderRadius: 4,
        overflow: "hidden",
    },
    bar: {
        height: "100%",
        borderRadius: 4,
    },
});
