import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

interface TextAreaProps extends TextInputProps {
    className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
    className = '',
    ...props
}) => {
    return (
        <TextInput
            multiline
            numberOfLines={4}
            placeholder="Nội dung"
            textAlignVertical="top"
            className={`w-full max-h-48 px-3 py-2.5 rounded-lg text-base text-text-primary
                bg-background placeholder:text-text-muted border border-border focus:border-primary
            ${className}
            `}
            {...props}
        />
    );
};

export default TextArea;
