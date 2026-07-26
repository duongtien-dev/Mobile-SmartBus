import { Button } from "@/components/Button";
import { FormField } from "@/components/Form/FormField";
import InputText from "@/components/Input/InputText";
import { PageHeader } from "@/components/PageHeader";
import { useToastify } from "@/hooks/useToastify";
import { useTranslation } from "@/i18n";
import { authService } from "@/services/AuthService";
import useAuthStore from "@/store/auth.store";
import {
    editProfileSchema,
    validateSchema,
    type FieldErrors,
} from "@/utils/validators";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import SelectGender from "./SelectGender";

type TForm = {
    full_name?: string;
    email?: string;
    phone?: string;
    gender?: string;
    date_of_birth?: string;
    occupation?: string;
    province?: string;
    district?: string;
    ward?: string;
    address_detail?: string;
};

type ProfileErrorFields = "full_name" | "phone";

export default function FormProfile() {
    const { t } = useTranslation();
    const user = useAuthStore((s) => s.user);
    const setUser = useAuthStore((s) => s.setUser);
    const showToast = useToastify();

    const [form, setForm] = useState<TForm>({
        full_name: user?.full_name,
        email: user?.email,
        phone: user?.phone,
        gender: user?.gender,
        date_of_birth: user?.date_of_birth,
        occupation: user?.occupation,
        province: user?.province,
        district: user?.district,
        ward: user?.ward,
        address_detail: user?.address_detail,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<FieldErrors<ProfileErrorFields>>({});

    const isFormValid = useMemo(
        () =>
            validateSchema(editProfileSchema, {
                full_name: form.full_name ?? "",
                phone: form.phone ?? "",
                gender: form.gender,
                date_of_birth: form.date_of_birth,
                occupation: form.occupation,
                province: form.province,
                district: form.district,
                ward: form.ward,
                address_detail: form.address_detail,
            }).ok,
        [form],
    );

    const handleChange = (key: keyof TForm, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        if (key === "full_name" || key === "phone") {
            if (errors[key]) {
                setErrors((prev) => ({ ...prev, [key]: undefined }));
            }
        }
    };

    const handleSubmit = async () => {
        if (isSubmitting) return;

        const validation = validateSchema(editProfileSchema, {
            full_name: form.full_name ?? "",
            phone: form.phone ?? "",
            gender: form.gender,
            date_of_birth: form.date_of_birth,
            occupation: form.occupation,
            province: form.province,
            district: form.district,
            ward: form.ward,
            address_detail: form.address_detail,
        });

        if (!validation.ok) {
            const nextErrors: FieldErrors<ProfileErrorFields> = {};
            for (const [key, messageKey] of Object.entries(validation.errors)) {
                if (
                    messageKey &&
                    (key === "full_name" || key === "phone")
                ) {
                    nextErrors[key] = t(messageKey);
                }
            }
            setErrors(nextErrors);
            showToast({
                type: "error",
                content: t("validation.formInvalid"),
            });
            return;
        }

        setErrors({});
        setIsSubmitting(true);

        try {
            const response = await authService.updateProfile(validation.data);

            showToast({
                type: response.success ? "success" : "error",
                content: response.success
                    ? t("profile.edit.success")
                    : t("profile.edit.fail"),
            });

            if (response.success) {
                setUser(response.data);
                router.back();
            }
        } catch (error: any) {
            showToast({
                type: "error",
                content:
                    error?.response?.data?.message ?? t("profile.edit.fail"),
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!user) {
        return (
            <View className="flex-1 items-center justify-center bg-background">
                <ActivityIndicator color="#005f8b" />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-background">
            <PageHeader title={t("profile.edit.title")} isIconBack={true} />

            <ScrollView
                className="flex-1"
                contentContainerClassName="gap-5 px-5 pb-10 pt-4"
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <FormField
                    labelText={t("profile.edit.fullName")}
                    required
                    error={errors.full_name}
                >
                    <InputText
                        value={form.full_name}
                        onChangeText={(value) =>
                            handleChange("full_name", value)
                        }
                    />
                </FormField>

                <FormField labelText={t("profile.edit.email")} required>
                    <InputText
                        value={form.email}
                        onChangeText={(value) => handleChange("email", value)}
                        disabled
                    />
                </FormField>

                <FormField
                    labelText={t("profile.edit.phone")}
                    required
                    error={errors.phone}
                >
                    <InputText
                        value={form.phone}
                        onChangeText={(value) => handleChange("phone", value)}
                        keyboardType="phone-pad"
                    />
                </FormField>

                <SelectGender
                    value={form.gender}
                    onChange={(value) => handleChange("gender", value)}
                />

                <FormField labelText={t("profile.edit.dob")}>
                    <InputText
                        value={form.date_of_birth}
                        onChangeText={(value) =>
                            handleChange("date_of_birth", value)
                        }
                        placeholder={t("profile.edit.dobPlaceholder")}
                    />
                </FormField>

                <FormField labelText={t("profile.edit.occupation")}>
                    <InputText
                        value={form.occupation}
                        onChangeText={(value) =>
                            handleChange("occupation", value)
                        }
                        placeholder={t("profile.edit.occupation")}
                    />
                </FormField>

                <FormField labelText={t("profile.edit.address")}>
                    <View className="gap-3">
                        <InputText
                            value={form.province}
                            onChangeText={(v) => handleChange("province", v)}
                            placeholder={t("profile.edit.province")}
                        />
                        <InputText
                            value={form.district}
                            onChangeText={(value) =>
                                handleChange("district", value)
                            }
                            placeholder={t("profile.edit.district")}
                        />
                        <InputText
                            value={form.ward}
                            onChangeText={(value) =>
                                handleChange("ward", value)
                            }
                            placeholder={t("profile.edit.ward")}
                        />
                        <InputText
                            value={form.address_detail}
                            onChangeText={(value) =>
                                handleChange("address_detail", value)
                            }
                            placeholder={t("profile.edit.addressDetail")}
                        />
                    </View>
                </FormField>

                <View className="pt-2">
                    <Button
                        type="accent"
                        variant="bold"
                        className="w-full rounded-xl"
                        disabled={!isFormValid || isSubmitting}
                        onPress={handleSubmit}
                    >
                        {isSubmitting ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            t("profile.edit.save")
                        )}
                    </Button>
                </View>
            </ScrollView>
        </View>
    );
}
