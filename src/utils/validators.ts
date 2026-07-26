import { z } from "zod";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** VN mobile: 0xxxxxxxxx or +84xxxxxxxxx */
export const VN_PHONE_REGEX = /^(0|\+84)(3|5|7|8|9)\d{8}$/;
/** CMND 9 digits or CCCD 12 digits */
export const CCCD_REGEX = /^\d{9}$|^\d{12}$/;
export const ACCOUNT_NUMBER_REGEX = /^\d{6,20}$/;
export const MIN_PASSWORD_LENGTH = 6;

export type FieldErrors<T extends string = string> = Partial<Record<T, string>>;

export type ValidationResult<T> =
    | { ok: true; data: T }
    | { ok: false; errors: FieldErrors };

export function isValidEmail(value: string) {
    return EMAIL_REGEX.test(value.trim());
}

export function isValidVnPhone(value: string) {
    const normalized = value.trim().replace(/[\s.-]/g, "");
    return VN_PHONE_REGEX.test(normalized);
}

export function isValidCccd(value: string) {
    return CCCD_REGEX.test(value.trim());
}

export function isValidAccountNumber(value: string) {
    return ACCOUNT_NUMBER_REGEX.test(value.trim());
}

/** Collect first error per field; issue.message should be an i18n key. */
export function validateSchema<T extends z.ZodTypeAny>(
    schema: T,
    data: unknown,
): ValidationResult<z.infer<T>> {
    const result = schema.safeParse(data);
    if (result.success) {
        return { ok: true, data: result.data };
    }

    const errors: FieldErrors = {};
    for (const issue of result.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (errors[key] == null) {
            errors[key] = issue.message;
        }
    }
    return { ok: false, errors };
}

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "validation.required")
        .refine(isValidEmail, "validation.email"),
    password: z.string().min(1, "validation.required"),
});

export const registerSchema = z
    .object({
        full_name: z.string().trim().min(1, "validation.required"),
        email: z
            .string()
            .trim()
            .min(1, "validation.required")
            .refine(isValidEmail, "validation.email"),
        phone: z
            .string()
            .trim()
            .min(1, "validation.required")
            .refine(isValidVnPhone, "validation.phone"),
        password: z
            .string()
            .min(MIN_PASSWORD_LENGTH, "validation.passwordMin"),
        password_confirm: z.string().min(1, "validation.required"),
    })
    .refine((data) => data.password === data.password_confirm, {
        message: "validation.passwordMismatch",
        path: ["password_confirm"],
    });

export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "validation.required")
        .refine(isValidEmail, "validation.email"),
});

export const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(MIN_PASSWORD_LENGTH, "validation.passwordMin"),
        confirmPassword: z.string().min(1, "validation.required"),
        otp: z.string().min(1, "validation.required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "validation.passwordMismatch",
        path: ["confirmPassword"],
    });

export const bankFormSchema = z.object({
    bankName: z.string().trim().min(1, "validation.required"),
    accountNumber: z
        .string()
        .trim()
        .min(1, "validation.required")
        .refine(isValidAccountNumber, "validation.accountNumber"),
    cccd: z
        .string()
        .trim()
        .min(1, "validation.required")
        .refine(isValidCccd, "validation.cccd"),
    cardHolderName: z.string().trim().min(1, "validation.required"),
    phoneNumber: z
        .string()
        .trim()
        .min(1, "validation.required")
        .refine(isValidVnPhone, "validation.phone"),
    email: z
        .string()
        .trim()
        .min(1, "validation.required")
        .refine(isValidEmail, "validation.email"),
});

export const editProfileSchema = z.object({
    full_name: z.string().trim().min(1, "validation.required"),
    phone: z
        .string()
        .trim()
        .min(1, "validation.required")
        .refine(isValidVnPhone, "validation.phone"),
    gender: z.string().optional(),
    date_of_birth: z.string().optional(),
    occupation: z.string().optional(),
    province: z.string().optional(),
    district: z.string().optional(),
    ward: z.string().optional(),
    address_detail: z.string().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type BankFormValues = z.infer<typeof bankFormSchema>;
export type EditProfileFormValues = z.infer<typeof editProfileSchema>;
