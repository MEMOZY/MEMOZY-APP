import { Friend } from "@/api/friend";

export type SharePermission = "read" | "both"; // 읽기 | 읽기+수정

export interface SelectedShare {
    friend: Friend;
    permission: SharePermission;
}
