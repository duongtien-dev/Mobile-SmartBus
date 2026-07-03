import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

interface InputTextProps extends TextInputProps {
    className?: string;
    disabled?: boolean;
}

const InputText: React.FC<InputTextProps> = ({
    className = '',
    disabled = false,
    ...props
}) => {
    return (
        <TextInput
            editable={!disabled}
            className={`text-base py-2.5 px-3 rounded-lg text-text-primary
            placeholder:text-text-muted border border-border focus:border-primary
            ${disabled ? 'bg-disabled-bg text-disabled border-border opacity-80' : 'bg-background'}
            ${className}
        `}
            {...props}
        />
    );
};

export default InputText;
