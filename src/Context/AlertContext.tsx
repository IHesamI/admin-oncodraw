import { createContext, ReactNode, useContext, useState } from "react";
import CustomAlertDialog from "../components/CustomAlert";
import { alertProps } from "../types";

const AlertContext = createContext<{
    showAlert: (payload: Omit<alertProps, 'isOpen'>) => void
}>({
    showAlert: (payload: Omit<alertProps, 'isOpen'>) => { },
});

export function useAlert() {
    return useContext(AlertContext);
}

const AlertContextProvider = ({ children }: { children: ReactNode }) => {
    const [alertConfig, setAlertConfig] = useState<alertProps>({
        isOpen: false,
        type: 'info',
        title: '',
        message: '',
        cancelText: '',
    });
    const showAlert = (payload: Omit<alertProps, 'isOpen'>) => {
        setAlertConfig({ ...payload, isOpen: true, });
    };

    const handleCancel = () => {
        setAlertConfig(prev => ({ ...prev, isOpen: false }));
    };

    return <AlertContext.Provider value={{
        showAlert
    }}>
        <CustomAlertDialog
            isOpen={alertConfig.isOpen}
            type={alertConfig.type}
            title={alertConfig.title}
            message={alertConfig.message}
            onConfirm={alertConfig.onConfirm}
            cancelText={alertConfig.cancelText}
            onCancel={alertConfig.onCancel || handleCancel}
            confirmText={alertConfig.confirmText}
        />
        {children}
    </AlertContext.Provider>
}

export default AlertContextProvider