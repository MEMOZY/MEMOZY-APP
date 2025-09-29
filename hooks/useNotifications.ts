import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { postDeviceToken } from "@/api/common";

export const useNotifications = (isLoggedIn: boolean) => {
    const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

    const [notification, setNotification] = useState<
        Notifications.Notification | undefined
    >(undefined);

    useEffect(() => {
        if (!isLoggedIn) return;

        registerForPushNotificationsAsync().then((token) => {
            setExpoPushToken(token || null);
            if (token) {
                postDeviceToken("iOS", token);
            }
        });

        const notificationListener =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });

        const responseListener =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {}
            );

        return () => {
            notificationListener.remove();
            responseListener.remove();
        };
    }, [isLoggedIn]);

    return {
        expoPushToken,
        notification,
    };
};

async function registerForPushNotificationsAsync() {
    if (!Device.isDevice) return;

    const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== "granted") {
        return;
    }

    try {
        const projectId = Constants?.expoConfig?.extra?.eas?.projectId;
        if (!projectId) {
            throw new Error("Project ID not found");
        }

        const pushToken = (
            await Notifications.getExpoPushTokenAsync({
                projectId,
            })
        ).data;

        return pushToken;
    } catch (error) {
        throw error;
    }
}
