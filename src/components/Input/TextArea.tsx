import React from "react";
import type { TextInputProps } from "react-native";
import { TextInput } from "react-native-css/components";

interface TextAreaProps extends TextInputProps {}

const TextArea: React.FC<TextAreaProps> = ({ className, ...props }) => {
    return (
        <TextInput
            multiline
            numberOfLines={4}
            placeholder="Nội dung"
            textAlignVertical="top"
            underlineColorAndroid="transparent"
            className={`max-h-48 w-full rounded-lg px-3 py-2.5 text-base text-text-primary bg-background placeholder:text-text-muted border border-border focus:border-primary focus:outline-none ${className}`}
            {...props}
        />
    );
};

export default TextArea;
