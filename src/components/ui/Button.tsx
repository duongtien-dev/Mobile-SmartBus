import { Pressable, Text, type PressableProps } from "react-native";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

type ButtonProps = Omit<PressableProps, "children"> & {
    label: string;
    variant?: ButtonVariant;
    className?: string;
    labelClassName?: string;
};

const containerClasses: Record<ButtonVariant, string> = {
    primary:
        "flex-row items-center justify-center rounded-xl px-5 py-3 bg-accent active:bg-accent-dark disabled:bg-accent-muted disabled:opacity-70",
    secondary:
        "flex-row items-center justify-center rounded-xl border border-border-strong px-5 py-3 bg-surface active:bg-border disabled:bg-disabled-bg disabled:opacity-70",
    outline:
        "flex-row items-center justify-center rounded-xl border-2 border-accent px-5 py-3 bg-transparent active:bg-accent-light disabled:border-accent-muted disabled:opacity-70",
    ghost:
        "flex-row items-center justify-center rounded-xl px-5 py-3 active:bg-accent-light",
};

const labelClasses: Record<ButtonVariant, string> = {
    primary: "font-bold text-on-accent",
    secondary: "font-bold text-text-primary disabled:text-disabled",
    outline: "font-bold text-accent disabled:text-accent-muted",
    ghost: "font-bold text-accent",
};

export function Button({
    label,
    variant = "primary",
    className,
    labelClassName,
    disabled,
    ...props
}: ButtonProps) {
    return (
        <Pressable
            accessibilityRole="button"
            className={`${containerClasses[variant]}${className ? ` ${className}` : ""}`}
            disabled={disabled}
            {...props}
        >
            <Text
                className={`${labelClasses[variant]}${labelClassName ? ` ${labelClassName}` : ""}`}
            >
                {label}
            </Text>
        </Pressable>
    );
}
