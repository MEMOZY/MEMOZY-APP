import { Stack } from "expo-router";

export default function ChatFlowLayout() {
    return (
        <Stack initialRouteName="select">
            <Stack.Screen name="select" options={{ headerShown: false }} />
            <Stack.Screen name="chat" options={{ headerShown: false }} />
            <Stack.Screen name="edit" options={{ headerShown: false }} />
            <Stack.Screen name="save" options={{ headerShown: false }} />
        </Stack>
    );
}
