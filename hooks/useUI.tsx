import { useContext } from "react";
import { UIContext } from "@/contexts/UIContext";

export const useUI = () => {
    const context = useContext(UIContext);
    if (!context) {
        throw new Error("useUI는 UIProvider 내에서만 사용할 수 있습니다.");
    }
    return context;
};
