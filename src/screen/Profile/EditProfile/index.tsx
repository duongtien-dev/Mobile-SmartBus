import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import InputText from "@/components/Input/InputText";
import { Switch } from "@/components/ui/switch";
import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    View,
} from "react-native";
import { authService } from "@/services/AuthService";
import useAuthStore from "@/store/auth.store";
import { useToastify } from "@/hooks/useToastify";

type GenderOption = "Nam" | "Nữ" | "";

export default function EditProfileScreen() {
    const user = useAuthStore((s) => s.user);
    const setUser = useAuthStore((s) => s.setUser);

    const showToast = useToastify();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState<GenderOption>("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [occupation, setOccupation] = useState("");
    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [ward, setWard] = useState("");
    const [addressDetail, setAddressDetail] = useState("");
    const [isPriority, setIsPriority] = useState(false);
    const [priorityUser, setPriorityUser] = useState("");

    useEffect(() => {
        if (!user) return;

        setFullName(user.full_name ?? "");
        setEmail(user.email ?? "");
        setPhone(user.phone ?? "");
        setGender((user.gender as GenderOption) ?? "");
        setDateOfBirth(
            user.date_of_birth
                ? new Date(user.date_of_birth).toISOString().slice(0, 10)
                : "",
        );
        setOccupation(user.occupation ?? "");
        setProvince(user.province ?? "");
        setDistrict(user.district ?? "");
        setWard(user.ward ?? "");
        setAddressDetail(user.address_detail ?? "");

        setIsPriority(Boolean(user.is_priority_user));
        setPriorityUser(user.priority_user ?? "");
    }, [user]);

    const handleSave = useCallback(async () => {
        if (!user || isSubmitting) return;
        setIsSubmitting(true);

        try {
            const payload = {
                full_name: fullName.trim(),
                phone: phone.trim(),
                gender: gender || undefined,
                date_of_birth: dateOfBirth
                    ? new Date(dateOfBirth).toISOString()
                    : undefined,
                occupation: occupation.trim() || undefined,
                province: province.trim() || undefined,
                district: district.trim() || undefined,
                ward: ward.trim() || undefined,
                address_detail: addressDetail.trim() || undefined,
                is_priority_user: isPriority,
                priority_user: isPriority
                    ? (priorityUser.trim() || "priority")
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
    }, [
        user,
        isSubmitting,
        fullName,
        phone,
        gender,
        dateOfBirth,
        occupation,
        province,
        district,
        ward,
        addressDetail,
        isPriority,
        priorityUser,
        setUser,
        showToast,
    ]);

    const isFormValid = useMemo(() => {
        return Boolean(fullName.trim() && phone.trim() && email.trim());
    }, [fullName, phone, email]);

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
                <View className="gap-2">
                    <Text className="text-sm font-medium text-text-primary">
                        Họ*
                    </Text>
                    <InputText value={fullName} onChangeText={setFullName} />
                </View>

                <View className="gap-2">
                    <Text className="text-sm font-medium text-text-primary">
                        Tên
                    </Text>
                    <InputText value={fullName} disabled />
                </View>

                <View className="gap-2">
                    <Text className="text-sm font-medium text-text-primary">
                        Email*
                    </Text>
                    <InputText value={email} disabled />
                </View>

                <View className="gap-2">
                    <Text className="text-sm font-medium text-text-primary">
                        Số điện thoại*
                    </Text>
                    <InputText
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                    />
                </View>

                <View className="gap-2">
                    <Text className="text-sm font-medium text-text-primary">
                        Giới tính
                    </Text>
                    <View className="flex-row items-center gap-6">
                        <Button
                            variant="outline"
                            className="flex-1 rounded-xl"
                            disabled={false}
                            onPress={() => setGender("Nam")}
                        >
                            <Text
                                className={
                                    gender === "Nam"
                                        ? "text-primary"
                                        : "text-text-primary"
                                }
                            >
                                Nam
                            </Text>
                        </Button>
                        <Button
                            variant="outline"
                            className="flex-1 rounded-xl"
                            disabled={false}
                            onPress={() => setGender("Nữ")}
                        >
                            <Text
                                className={
                                    gender === "Nữ"
                                        ? "text-primary"
                                        : "text-text-primary"
                                }
                            >
                                Nữ
                            </Text>
                        </Button>
                    </View>
                </View>

                <View className="gap-2">
                    <Text className="text-sm font-medium text-text-primary">
                        Ngày sinh
                    </Text>
                    <InputText
                        value={dateOfBirth}
                        onChangeText={setDateOfBirth}
                        placeholder="YYYY-MM-DD"
                    />
                </View>

                <View className="gap-2">
                    <Text className="text-sm font-medium text-text-primary">
                        Nghề nghiệp
                    </Text>
                    <InputText
                        value={occupation}
                        onChangeText={setOccupation}
                    />
                </View>

                <View className="gap-2">
                    <Text className="text-sm font-medium text-text-primary">
                        Địa chỉ cư trú
                    </Text>

                    <View className="gap-3">
                        <InputText
                            value={province}
                            onChangeText={setProvince}
                            placeholder="Tỉnh"
                        />
                        <InputText
                            value={district}
                            onChangeText={setDistrict}
                            placeholder="Quận/Huyện"
                        />
                        <InputText
                            value={ward}
                            onChangeText={setWard}
                            placeholder="Phường/Xã"
                        />
                        <InputText
                            value={addressDetail}
                            onChangeText={setAddressDetail}
                            placeholder="Địa chỉ chi tiết"
                        />
                    </View>
                </View>

                <View className="mt-1 flex-row items-center justify-between rounded-xl border border-border bg-surface-elevated px-4 py-3">
                    <View className="flex-1">
                        <Text className="text-sm font-medium text-text-primary">
                            Đối tượng ưu tiên
                        </Text>
                        {isPriority ? (
                            <Text className="mt-1 text-xs text-text-muted">
                                Đã bật
                            </Text>
                        ) : (
                            <Text className="mt-1 text-xs text-text-muted">
                                Chưa bật
                            </Text>
                        )}
                    </View>
                    <Switch checked={isPriority} onCheckedChange={setIsPriority} />
                </View>

                <View className="pt-2">
                    <Button
                        type="accent"
                        variant="bold"
                        className="w-full rounded-xl"
                        disabled={!isFormValid || isSubmitting}
                        onPress={handleSave}
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

