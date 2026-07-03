import { Pressable, Text, type PressableProps } from "react-native";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = Omit<PressableProps, "children"> & {
    label: string;
    variant?: ButtonVariant;
    className?: string;
    labelClassName?: string;
};

const containerClasses: Record<ButtonVariant, string> = {
    primary:
        "flex-row items-center justify-center rounded-xl px-5 py-3 bg-cta-bg active:bg-cta-bg-pressed disabled:opacity-70",
    secondary:
        "flex-row items-center justify-center rounded-xl border border-border-strong px-5 py-3 bg-surface active:bg-border disabled:bg-disabled-bg disabled:opacity-70",
    ghost:
        "flex-row items-center justify-center rounded-xl px-5 py-3 active:bg-accent-light",
};

const labelClasses: Record<ButtonVariant, string> = {
    primary: "font-semibold text-cta-text",
    secondary: "font-semibold text-text-primary disabled:text-disabled",
    ghost: "font-semibold text-accent-dark",
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
