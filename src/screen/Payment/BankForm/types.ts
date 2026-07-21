export type BankFormData = {
    bankName: string;
    accountNumber: string;
    cccd: string;
    cardHolderName: string;
    phoneNumber: string;
    email: string;
};

export const INITIAL_BANK_FORM: BankFormData = {
    bankName: "",
    accountNumber: "",
    cccd: "",
    cardHolderName: "",
    phoneNumber: "",
    email: "",
};

export function isBankFormValid(formData: BankFormData) {
    return Boolean(
        formData.bankName.trim() &&
        formData.accountNumber.trim() &&
        formData.cccd.trim() &&
        formData.cardHolderName.trim() &&
        formData.phoneNumber.trim() &&
        formData.email.trim(),
    );
}

export function parseBankFormData(formData: BankFormData) {
    return {
        provider: "napas",
        bankName: formData.bankName.trim(),
        accountNumber: formData.accountNumber.trim(),
        cccd: formData.cccd.trim(),
        cardHolderName: formData.cardHolderName.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        email: formData.email.trim(),
    };
}
