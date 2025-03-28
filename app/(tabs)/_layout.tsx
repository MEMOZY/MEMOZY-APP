import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/common/HapticTab";
import TabBarBackground from "@/components/common/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
    CalendarIcon,
    FilledCalendarIcon,
    FilledGearIcon,
    FilledHomeIcon,
    GearIcon,
    HomeIcon,
} from "@/assets/images/icons";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor:
                    Colors[colorScheme ?? "light"].tabIconSelected,
                tabBarInactiveTintColor:
                    Colors[colorScheme ?? "light"].tabIconDefault,
                tabBarShowLabel: false,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        position: "absolute",
                        backgroundColor:
                            Colors[colorScheme ?? "light"].background,
                        borderTopWidth: 0,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    android: {
                        position: "absolute",
                        backgroundColor:
                            Colors[colorScheme ?? "light"].background,
                        borderTopWidth: 0,
                        elevation: 0,
                    },
                    default: {
                        backgroundColor:
                            Colors[colorScheme ?? "light"].background,
                        borderTopWidth: 0,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                }),
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, focused }) =>
                        focused ? (
                            <FilledHomeIcon color={color} />
                        ) : (
                            <HomeIcon color={color} />
                        ),
                }}
            />
            <Tabs.Screen
                name="calendar"
                options={{
                    title: "Calendar",
                    tabBarIcon: ({ color, focused }) =>
                        focused ? (
                            <FilledCalendarIcon color={color} />
                        ) : (
                            <CalendarIcon color={color} />
                        ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color, focused }) =>
                        focused ? (
                            <FilledGearIcon color={color} />
                        ) : (
                            <GearIcon color={color} />
                        ),
                }}
            />
        </Tabs>
    );
}
