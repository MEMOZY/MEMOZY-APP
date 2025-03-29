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
        setModal({ visible: true, ...options });
    }, []);

    const hideModal = useCallback(() => {
        setModal((prev) => ({ ...prev, visible: false }));
    }, []);

    const showSnackbar = useCallback(
        (options: Omit<SnackbarOptions, "visible">) => {
            setSnackbar({ visible: true, ...options });

            setTimeout(() => {
                hideSnackbar();
            }, options.duration || 3000);
        },
        []
    );

    const hideSnackbar = useCallback(() => {
        setSnackbar((prev) => ({ ...prev, visible: false }));
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
