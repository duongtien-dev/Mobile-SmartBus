import type { ReactNode } from "react";
import { Pressable, Text, type PressableProps } from "react-native";

type ButtonVariant = "outline" | "bold";
type ButtonType = "primary" | "secondary" | "danger";
type ButtonSize = "md";

type ButtonProps = Omit<PressableProps, "children"> & {
    children: ReactNode;
    variant?: ButtonVariant;
    type?: ButtonType;
    size?: ButtonSize;
    className?: string;
    labelClassName?: string;
};

const baseClass = "group flex-row items-center justify-center rounded-lg";

const classType = {
    outline: {
        primary:
            "border border-primary bg-transparent active:bg-primary disabled:border-primary-muted disabled:opacity-70",
        secondary:
            "border border-border-strong bg-transparent active:bg-text-secondary disabled:opacity-70",
        danger:
            "border border-alert bg-transparent active:bg-alert disabled:border-alert-muted disabled:opacity-70",
    },
    bold: {
        primary:
            "bg-primary active:bg-primary-dark disabled:bg-primary-muted disabled:opacity-70",
        secondary:
            "bg-text-secondary active:bg-text-primary disabled:bg-disabled disabled:opacity-70",
        danger:
            "bg-alert active:bg-alert-dark disabled:bg-alert-muted disabled:opacity-70",
    },
    size: {
        md: "px-4 py-2",
    },
} as const;

const labelClassType = {
    outline: {
        primary:
            "font-bold text-base text-primary group-active:text-on-primary disabled:text-primary-muted",
        secondary:
            "font-bold text-base text-text-secondary group-active:text-on-primary disabled:text-disabled",
        danger:
            "font-bold text-base text-alert group-active:text-on-alert disabled:text-alert-muted",
    },
    bold: {
        primary: "font-bold text-base text-on-primary",
        secondary: "font-bold text-base text-on-primary",
        danger: "font-bold text-base text-on-alert",
    },
} as const;

export function Button({
    children,
    variant = "bold",
    type = "primary",
    size = "md",
    className = "",
    labelClassName = "",
    disabled,
    ...props
}: ButtonProps) {
    return (
        <Pressable
            accessibilityRole="button"
            className={`${baseClass} ${classType[variant][type]} ${classType.size[size]} ${className}`}
            disabled={disabled}
            {...props}
        >
            <Text
                className={`${labelClassType[variant][type]}${labelClassName ? ` ${labelClassName}` : ""}`}
            >
                {children}
            </Text>
        </Pressable>
    );
}
