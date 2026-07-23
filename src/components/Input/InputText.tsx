import React from "react";
import type { TextInputProps } from "react-native";
import { TextInput } from "react-native-css/components";

interface InputTextProps extends TextInputProps {
    disabled?: boolean;
}

const InputText: React.FC<InputTextProps> = ({...Props}: InputTextProps) => {
    const { className, disabled, value, ...props } = Props;
    return (
        <TextInput
            editable={!disabled}
            underlineColorAndroid="transparent"
            className={`text-md rounded-lg px-3 py-2.5 text-text-primary placeholder:text-text-muted border border-border focus:border-primary focus:outline-none ${disabled ? "border-border bg-disabled-bg text-disabled opacity-80" : "bg-background"} ${className}`}
            // Tránh controlled → uncontrolled khi value chuyển sang undefined
            {...(value === undefined ? {} : { value: value ?? "" })}
            {...props}
        />
    );
};

export default InputText;
