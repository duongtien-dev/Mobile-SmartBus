import Toast from 'react-native-toast-message';

export type ToastType = 'success' | 'error' | 'warning';

interface ShowToastProps {
    type: ToastType;
    content?: string;
}

export const useToastify = () => {
    const showToast = ({
        type,
        content,
    }: ShowToastProps) => {
        Toast.show({
            type,
            text1: content,
            position: 'top',
        });
    };

    return showToast;
};
