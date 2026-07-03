import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

interface InputNumberV2Props extends Omit<NumericFormatProps<TextInputProps>, 'customInput'> {
    className?: string;
    disabled?: boolean;
}

const InputNumberV2: React.FC<InputNumberV2Props> = ({
    className = '',
    disabled = false,
    ...props
}) => {
    return (
        <NumericFormat
            customInput={TextInput}
            editable={!disabled}
            underlineColorAndroid="transparent"
            keyboardType="numeric"
            thousandSeparator=","
            displayType="input"
            className={`text-base py-2.5 px-3 rounded-lg text-text-primary placeholder:text-text-muted      border ${disabled ? 'bg-disabled-bg text-disabled opacity-80' : 'bg-background'}
            ${className}
            `}
            {...props}
        />
    );
};

export default InputNumberV2;
