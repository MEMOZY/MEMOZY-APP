import AsyncStorage from "@react-native-async-storage/async-storage";
import ky, { BeforeRequestHook } from "ky";

declare module "ky" {
    export interface NormalizedOptions {
        withAuth?: boolean;
    }
}

const kyClient = ky.extend({
    prefixUrl: process.env.EXPO_PUBLIC_BACKEND_URL,
    hooks: {
        beforeRequest: [
            (request, options) => {
                setAuthorizationHeader(request, options);
            },
        ],
    },
});

const setAuthorizationHeader: BeforeRequestHook = (request, options) => {
    if (!options.withAuth) {
        return;
    }

    const accessToken = AsyncStorage.getItem("accessToken");

    if (!accessToken) return;

    request.headers.set("Authorization", `Bearer ${accessToken}`);
};
