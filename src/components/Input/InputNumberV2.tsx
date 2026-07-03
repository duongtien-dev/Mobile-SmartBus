import React, { useState } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

interface InputAmountProps extends Omit<NumericFormatProps<TextInputProps>, 'customInput'> {
    className?: string;
    disabled?: boolean;
}

const InputAmount: React.FC<InputAmountProps> = ({
    className = '',
    disabled = false,
    onFocus,
    onBlur,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <NumericFormat
            // 1. Cấu hình lõi
            customInput={TextInput}
            editable={!disabled}
            underlineColorAndroid="transparent"
            keyboardType="numeric"

            // 2. Định dạng mặc định (Có thể ghi đè khi gọi component)
            thousandSeparator=","
            displayType="input"

            // 3. Quản lý trạng thái Focus để đổi màu viền chuẩn xác trên Mobile
            onFocus={(e: any) => {
                setIsFocused(true);
                if (onFocus) onFocus(e);
            }}
            onBlur={(e: any) => {
                setIsFocused(false);
                if (onBlur) onBlur(e);
            }}

            // 4. Áp dụng Design Token của bạn
            className={`
        text-base py-2.5 px-3 rounded-lg text-text-primary placeholder:text-text-muted border
        ${disabled ? 'bg-disabled-bg text-disabled opacity-80' : 'bg-background'}
        ${isFocused && !disabled ? 'border-primary' : 'border-border'}
        ${className}
      `}
            {...props}
        />
    );
};

export default InputAmount;
