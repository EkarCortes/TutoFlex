import React from 'react';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

const toastConfig = {
    success: (props: any) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: '#2C81AC', backgroundColor: '#E6F4FA' }} // Azul
            text1Style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#2C81AC',
            }}
            text2Style={{
                fontSize: 14,
                color: '#2C81AC',
            }}
        />
    ),
    error: (props: any) => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: '#FB8500', backgroundColor: '#FFF4E6' }} // Naranja
            text1Style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#FB8500',
            }}
            text2Style={{
                fontSize: 14,
                color: '#FB8500',
            }}
        />
    ),
    info: (props: any) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: '#023047', backgroundColor: '#D9EAF3' }} // Azul oscuro
            text1Style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#023047',
            }}
            text2Style={{
                fontSize: 14,
                color: '#023047',
            }}
        />
    ),
};

const ToastComponent: React.FC = () => {
    return <Toast config={toastConfig} />;
};

export const showToast = (
    type: 'success' | 'error' | 'info', 
    message: string, 
    title?: string,
    position: 'top' | 'bottom' = 'top'
) => {
    const translatedType = type === 'success' 
        ? 'Éxito' 
        : type === 'error' 
        ? 'Error' 
        : type === 'info'
        ? 'Información': '';
    Toast.show({
        type,
        text1: title || translatedType,
        text2: message,
        position,
        topOffset: position === 'top' ? -100 : undefined,
        visibilityTime: 4000,
    });
};

export default ToastComponent;