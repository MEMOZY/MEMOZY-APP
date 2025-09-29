import { Friend } from "@/api/friend";

export type SharePermission = "VIEWER" | "EDITOR";

export interface SelectedShare {
    friend: Friend;
    permission: SharePermission;
}
