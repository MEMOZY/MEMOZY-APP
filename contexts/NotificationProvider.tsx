import { createContext, useContext, useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { useAuth } from "./AuthContext";
import { useNotifications } from "@/hooks/useNotifications";

interface NotificationContextType {
    expoPushToken: string | null;
    notification: Notifications.Notification | undefined;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error(
            "useNotification은 NotificationProvider 내에서만 사용할 수 있습니다."
        );
    }
    return context;
};

export const NotificationsProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { isLoggedIn } = useAuth();
    const { expoPushToken, notification } = useNotifications(isLoggedIn);

    return (
        <NotificationContext.Provider value={{ expoPushToken, notification }}>
            {children}
        </NotificationContext.Provider>
    );
};
