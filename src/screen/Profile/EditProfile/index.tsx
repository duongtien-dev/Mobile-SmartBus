import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import InputText from "@/components/Input/InputText";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    View,
} from "react-native";
import { authService } from "@/services/AuthService";
import useAuthStore from "@/store/auth.store";
import { useToastify } from "@/hooks/useToastify";
import { FormField } from "@/components/Form/FormField";

type TForm = {
    full_name: string;
    email: string;
    phone: string;
    gender: 'Nam' | 'Nữ' | undefined;
    date_of_birth: string;
    occupation: string;
    province: string;
    district: string;
    ward: string;
    address_detail: string;
    is_priority_user: boolean;
    priority_user: string;
}

const EMPTY_FORM: TForm = {
    full_name: "",
    email: "",
    phone: "",
    gender: undefined,
    date_of_birth: "",
    occupation: "",
    province: "",
    district: "",
    ward: "",
    address_detail: "",
    is_priority_user: false,
    priority_user: "",
};

const GENDER_OPTIONS: ("Nam" | "Nữ")[] = ["Nam", "Nữ"];

export default function EditProfileScreen() {
    const user = useAuthStore((s) => s.user);
    const setUser = useAuthStore((s) => s.setUser);
    const showToast = useToastify();

    const [form, setForm] = useState(EMPTY_FORM);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!user) return;

        setForm({
            full_name: user.full_name,
            email: user.email ?? "",
            phone: user.phone ?? "",
            gender: user.gender as 'Nam' | 'Nữ',
            date_of_birth: user.date_of_birth
                ? new Date(user.date_of_birth).toISOString().slice(0, 10)
                : "",
            occupation: user.occupation ?? "",
            province: user.province ?? "",
            district: user.district ?? "",
            ward: user.ward ?? "",
            address_detail: user.address_detail ?? "",
            is_priority_user: Boolean(user.is_priority_user),
            priority_user: user.priority_user ?? "",
        });
    }, [user]);

    const handleChange = (name: keyof TForm, value: TForm[keyof TForm]) => {
        setForm((prev) => ({ ...prev, [name]: value }));
    }


    const handleSubmit = async () => {
        const values = form;
        setIsSubmitting(true);
        try {
            const payload = {
                full_name: values.full_name.trim(),
                phone: values.phone.trim(),
                gender: values.gender ?? undefined,
                date_of_birth: values.date_of_birth?.trim()
                    ? new Date(values.date_of_birth).toISOString()
                    : undefined,
                occupation: values.occupation?.trim() || undefined,
                province: values.province.trim() || undefined,
                district: values.district.trim() || undefined,
                ward: values.ward.trim() || undefined,
                address_detail: values.address_detail.trim() || undefined,
                is_priority_user: values.is_priority_user,
                priority_user: values.is_priority_user
                    ? values.priority_user.trim() || "priority"
                    : undefined,
            };

            const response = await authService.updateProfile(payload);
            const updated = response.data;

            if (updated) {
                setUser(updated);
            }

            showToast({
                type: "success",
                content: "Cập nhật thông tin thành công",
            });
            router.back();
        } catch {
            showToast({
                type: "error",
                content: "Cập nhật thông tin thất bại",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    if (!user) {
        return (
            <View className="flex-1 items-center justify-center bg-background">
                <ActivityIndicator color="#005f8b" />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-background">
            <PageHeader title="Thông tin cá nhân" isIconBack={true} />

            <ScrollView
                className="flex-1"
                contentContainerClassName="gap-5 px-5 pb-10 pt-4"
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <FormField labelText="Họ" required={true}>
                    <InputText
                        value={form.full_name}
                        onChangeText={(v) => handleChange("full_name", v)}
                    />
                </FormField>

                <FormField labelText="Tên" required={true}>
                    <InputText value={form.full_name} disabled />
                </FormField>

                <FormField labelText="Email" required={true}>
                    <InputText value={form.email} disabled />
                </FormField>

                <FormField labelText="Số điện thoại" required={true}>
                    <InputText
                        value={form.phone}
                        onChangeText={(v) => handleChange("phone", v)}
                        keyboardType="phone-pad"
                    />
                </FormField>

                <FormField labelText="Giới tính" required={true}>
                    <RadioGroup
                        className="flex-row items-center gap-6"
                        value={form.gender}
                        onValueChange={(value) =>
                            handleChange("gender", value as (typeof GENDER_OPTIONS)[number])
                        }
                    >
                        {GENDER_OPTIONS.map((option) => {
                            return (
                                <View key={option} className="flex-row items-center gap-2"
                                >
                                    <RadioGroupItem
                                        value={option}
                                        disabled={isSubmitting}
                                    />
                                    <Text className="text-text-primary">
                                        {option}
                                    </Text>
                                </View>
                            );
                        })}
                    </RadioGroup>
                </FormField>

                <FormField labelText="Ngày sinh">
                    <InputText
                        value={form.date_of_birth}
                        onChangeText={(v) => handleChange("date_of_birth", v)}
                        placeholder="YYYY-MM-DD"
                    />
                </FormField>

                <FormField labelText="Nghề nghiệp">
                    <InputText
                        value={form.occupation}
                        onChangeText={(v) => handleChange("occupation", v)}
                    />
                </FormField>

                <FormField labelText="Địa chỉ cư trú">
                    <View className="gap-3">
                        <InputText
                            value={form.province}
                            onChangeText={(v) => handleChange("province", v)}
                            placeholder="Tỉnh"
                        />
                        <InputText
                            value={form.district}
                            onChangeText={(v) => handleChange("district", v)}
                            placeholder="Quận/Huyện"
                        />
                        <InputText
                            value={form.ward}
                            onChangeText={(v) => handleChange("ward", v)}
                            placeholder="Phường/Xã"
                        />
                        <InputText
                            value={form.address_detail}
                            onChangeText={(v) => handleChange("address_detail", v)}
                            placeholder="Địa chỉ chi tiết"
                        />
                    </View>
                </FormField>

                <View className="mt-1 flex-row items-center justify-between rounded-xl border border-border bg-surface-elevated px-4 py-3">
                    <View className="flex-1">
                        <Text className="text-sm font-medium text-text-primary">
                            Đối tượng ưu tiên
                        </Text>
                        <Text className="mt-1 text-xs text-text-muted">
                            {form.is_priority_user ? "Đã bật" : "Chưa bật"}
                        </Text>
                    </View>
                    <Switch
                        checked={form.is_priority_user}
                        onCheckedChange={(v) => handleChange("is_priority_user", v)}
                    />
                </View>

                <View className="pt-2">
                    <Button
                        type="accent"
                        variant="bold"
                        className="w-full rounded-xl"
                        disabled={isSubmitting}
                        onPress={handleSubmit}
                    >
                        {isSubmitting ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            "Lưu"
                        )}
                    </Button>
                </View>
            </ScrollView>
        </View>
    );
}
