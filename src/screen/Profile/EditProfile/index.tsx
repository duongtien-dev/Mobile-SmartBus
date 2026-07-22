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
    full_name?: string;
    email?: string;
    phone?: string;
    gender: 'Nam' | 'Nữ' | undefined;
    date_of_birth?: string;
    occupation?: string;
    province?: string;
    district?: string;
    ward?: string;
    address_detail?: string;
}

const GENDER_OPTIONS: ("Nam" | "Nữ")[] = ["Nam", "Nữ"];

export default function FormProfile() {
    const user = useAuthStore((s) => s.user);
    const setUser = useAuthStore((s) => s.setUser);
    const showToast = useToastify();

    const [form, setForm] = useState<TForm>({
        full_name: user?.full_name,
        email: user?.email,
        phone: user?.phone,
        gender: user?.gender as 'Nam' | 'Nữ',
        date_of_birth: user?.date_of_birth,
        occupation: user?.occupation,
        province: user?.province,
        district: user?.district,
        ward: user?.ward,
        address_detail: user?.address_detail,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (name: keyof TForm, value: TForm[keyof TForm]) => {
        setForm((prev) => ({ ...prev, [name]: value }));
    }


    const handleSubmit = async () => {
        const values = form;
        setIsSubmitting(true);
        const payload = {
            full_name: values.full_name,
            phone: values.phone,
            gender: values.gender,
            date_of_birth: values.date_of_birth,
            occupation: values.occupation,
            province: values.province,
            district: values.district,
            ward: values.ward,
            address_detail: values.address_detail,
        };

        const response = await authService.updateProfile(payload);

        showToast({
            type: response.success ? "success" : "error",
            content: response.success ? "Cập nhật thông tin thành công" : "Cập nhật thông tin thất bại",
        });

        if (response.success) {
            setUser(response.data);
            router.back();
        }
        setIsSubmitting(false);
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
                <FormField labelText="Họ và tên" required={true}>
                    <InputText
                        value={form.full_name}
                        onChangeText={(value) => handleChange("full_name", value)}
                    />
                </FormField>

                <FormField labelText="Email" required={true}>
                    <InputText
                        value={form.email}
                        onChangeText={(value) => handleChange("email", value)}
                        disabled
                    />
                </FormField>

                <FormField labelText="Số điện thoại" required={true}>
                    <InputText
                        value={form.phone}
                        onChangeText={(value) => handleChange("phone", value)}
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
                        onChangeText={(value) => handleChange("date_of_birth", value)}
                        placeholder="YYYY-MM-DD"
                    />
                </FormField>

                <FormField labelText="Nghề nghiệp">
                    <InputText
                        value={form.occupation}
                        onChangeText={(value) => handleChange("occupation", value)}
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
                            onChangeText={(value) => handleChange("district", value)}
                            placeholder="Quận/Huyện"
                        />
                        <InputText
                            value={form.ward}
                            onChangeText={(value) => handleChange("ward", value)}
                            placeholder="Phường/Xã"
                        />
                        <InputText
                            value={form.address_detail}
                            onChangeText={(value) => handleChange("address_detail", value)}
                            placeholder="Địa chỉ chi tiết"
                        />
                    </View>
                </FormField>

                <View className="pt-2">
                    <Button type="accent" variant="bold" className="w-full rounded-xl"
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
