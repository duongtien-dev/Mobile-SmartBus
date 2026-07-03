import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

interface InputNumberProps extends TextInputProps {
    className?: string;
    disabled?: boolean;
}

const InputNumber: React.FC<InputNumberProps> = ({
    className = '',
    disabled = false,
    ...props
}) => {

    return (
        <TextInput
            editable={!disabled}
            underlineColorAndroid="transparent"
            className={`text-base py-2.5 md:py-3 px-3 rounded-lg text-text-primary placeholder:text-text-muted border focus:border-primary
            ${disabled ? 'bg-disabled-bg text-disabled opacity-80' : 'bg-background'}
            ${className}
            `}
            {...props}
        />
    );
};

export default InputNumber;
