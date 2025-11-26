import React, { createContext, useState, useCallback } from "react";

type ModalOptions = {
    visible: boolean;
    title?: string;
    subtitle?: string;
    confirmText?: string;
    cancelText?: string;
    color?: string;
    content?: React.ReactNode;
    onConfirm?: () => void;
    onCancel?: () => void;
};

type SnackbarOptions = {
    visible: boolean;
    message: string;
    color?: string;
    duration?: number;
};

interface UIContextProps {
    modal: ModalOptions;
    snackbar: SnackbarOptions;
    showModal: (options: Omit<ModalOptions, "visible">) => void;
    hideModal: () => void;
    showSnackbar: (options: Omit<SnackbarOptions, "visible">) => void;
    hideSnackbar: () => void;
}

export const UIContext = createContext<UIContextProps | undefined>(undefined);

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
    const [modal, setModal] = useState<ModalOptions>({ visible: false });
    const [snackbar, setSnackbar] = useState<SnackbarOptions>({
        visible: false,
        message: "",
    });

    const showModal = useCallback((options: Omit<ModalOptions, "visible">) => {
        // 항상 새 옵션으로 덮어써서 이전 모달 내용이 남지 않도록 처리
        setModal({ visible: true, ...options });
    }, []);

    const hideModal = useCallback(() => {
        // 모달을 닫을 때는 내용도 함께 초기화하여
        // 다음 모달이 열릴 때 이전 내용이 잠깐 보이지 않도록 한다.
        setModal({ visible: false });
    }, []);

    const showSnackbar = useCallback(
        (options: Omit<SnackbarOptions, "visible">) => {
            // 항상 새 옵션으로 덮어써서 이전 스낵바 내용이 남지 않도록 처리
            setSnackbar({ visible: true, ...options });

            setTimeout(() => {
                hideSnackbar();
            }, options.duration || 3000);
        },
        []
    );

    const hideSnackbar = useCallback(() => {
        // 스낵바를 닫을 때 메시지를 초기화하여
        // 다음 스낵바가 열릴 때 이전 메시지가 잠깐 보이지 않도록 한다.
        setSnackbar({ visible: false, message: "" });
    }, []);

    return (
        <UIContext.Provider
            value={{
                modal,
                snackbar,
                showModal,
                hideModal,
                showSnackbar,
                hideSnackbar,
            }}
        >
            {children}
        </UIContext.Provider>
    );
};
