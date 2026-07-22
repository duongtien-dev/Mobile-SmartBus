import { Select } from "@/components/Select";
import { PageHeader } from "@/components/PageHeader";
import { FormControls } from "@/screen/Trip/Ticket/shared/FormControls";
import useTripBookingStore, {
    computeSingleTicketPrice,
} from "@/store/tripBooking.store";
import { router } from "expo-router";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { FormField } from "@/components/Form/FormField";
import InputText from "@/components/Input/InputText";

const TIME_OPTIONS = [
    { value: "06:00", label: "06:00" },
    { value: "07:00", label: "07:00" },
    { value: "08:00", label: "08:00" },
    { value: "09:00", label: "09:00" },
    { value: "10:00", label: "10:00" },
];

const SEAT_OPTIONS = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
];

export default function SingleTicketScreen() {
    const searchContext = useTripBookingStore((state) => state.searchContext);
    const pickupStopName = useTripBookingStore(
        (state) => state.pickupStopName,
    );
    const singleForm = useTripBookingStore((state) => state.singleForm);
    const updateSingleForm = useTripBookingStore(
        (state) => state.updateSingleForm,
    );
    const setTotalPrice = useTripBookingStore((state) => state.setTotalPrice);

    const originName = searchContext?.originName;
    const destinationName = searchContext?.destinationName;
    const displayPickupStop = pickupStopName;

    const {
        departureDate,
        departureTime,
        seatCount,
        fullName,
        phoneNumber,
        acceptedTerms,
    } = singleForm;

    const totalPrice = computeSingleTicketPrice();

    const handleSubmit = () => {
        setTotalPrice(totalPrice);
        router.push("/trips/tickets/payment" as never);
    };

    return (
        <View className="flex-1 bg-background">
            <PageHeader title="Vé lượt" isIconBack={true} />

            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    className="flex-1"
                    contentContainerClassName="gap-6 px-5 pb-6 pt-2"
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="gap-4">
                        <Text className="text-base font-bold text-primary">Điểm đi / đến</Text>
                        <FormField labelText="Điểm đi">
                            <InputText
                                value={originName}
                                editable={false}
                                className="h-12 rounded-xl border-0 bg-surface px-4 shadow-sm"
                            />
                        </FormField>
                        <FormField labelText="Điểm đến">
                            <InputText
                                value={destinationName}
                                editable={false}
                                className="h-12 rounded-xl border-0 bg-surface px-4 shadow-sm"
                            />
                        </FormField>
                    </View>

                    <View className="gap-4">
                        <Text className="text-base font-bold text-primary">Thông tin lượt đi</Text>
                        <FormField labelText="Trạm đón (Trạm lên xe)">
                            <InputText
                                value={displayPickupStop}
                                editable={false}
                                className="h-12 rounded-xl border-0 bg-surface px-4 shadow-sm"
                            />
                        </FormField>

                        <FormField labelText="Ngày đi">
                            <InputText
                                value={departureDate}
                                editable={false}
                                className="h-12 rounded-xl border-0 bg-surface px-4 shadow-sm"
                            />
                        </FormField>

                        <View className="flex-row gap-3">
                            <View className="flex-1 gap-2">
                                <Text className="text-sm font-medium text-primary">
                                    Giờ đi <Text className="text-alert">*</Text>
                                </Text>
                                <Select
                                    value={departureTime}
                                    onValueChange={(value) =>
                                        updateSingleForm({
                                            departureTime: value,
                                        })
                                    }
                                    placeholder="Chọn giờ"
                                    options={TIME_OPTIONS}
                                    triggerClassName="h-12 rounded-xl border-0 bg-surface px-4 shadow-sm"
                                />
                            </View>

                            <View className="flex-1 gap-2">
                                <Text className="text-sm font-medium text-primary">
                                    Số lượng ghế{" "}
                                    <Text className="text-alert">*</Text>
                                </Text>
                                <Select
                                    value={seatCount}
                                    onValueChange={(value) =>
                                        updateSingleForm({ seatCount: value })
                                    }
                                    placeholder="Chọn"
                                    options={SEAT_OPTIONS}
                                    triggerClassName="h-12 rounded-xl border-0 bg-surface px-4 shadow-sm"
                                />
                            </View>
                        </View>
                    </View>

                    <View className="gap-4">
                        <Text className="text-base font-bold text-primary">Thông tin khách hàng</Text>
                        <FormField labelText="Họ và tên">
                            <InputText
                                value={fullName}
                                onChangeText={(value) =>
                                    updateSingleForm({ fullName: value })
                                }
                                placeholder="Nhập họ và tên"
                            />
                        </FormField>
                        <FormField labelText="Số điện thoại">
                            <InputText
                                value={phoneNumber}
                                onChangeText={(value) =>
                                    updateSingleForm({ phoneNumber: value })
                                }
                                placeholder="Nhập số điện thoại"
                                keyboardType="phone-pad"
                            />
                        </FormField>
                    </View>

                    <View className="gap-4">
                        <Text className="text-base font-bold text-primary">Điều khoản và lưu ý</Text>
                        <Text className="text-sm leading-6 text-text-muted">
                            (*) Quý khách vui lòng có mặt tại điểm đón trước ít
                            nhất 10 phút so với thời gian đón.
                        </Text>
                        <Text className="text-sm leading-6 text-text-muted">
                            (*) Vé đã mua không thể đổi, trả hoặc hoàn tiền.
                        </Text>

                        <Pressable
                            className="mt-2 flex-row items-start gap-3 active:opacity-80"
                            onPress={() =>
                                updateSingleForm({ acceptedTerms: !acceptedTerms })
                            }
                        >
                            <View className={`mt-0.5 h-5 w-5 items-center justify-center rounded border-2 ${
                                    acceptedTerms
                                        ? "border-primary bg-primary"
                                        : "border-border bg-background"
                                }`}
                            >
                                {acceptedTerms ? (
                                    <Text className="text-xs font-bold text-on-primary">
                                        ✓
                                    </Text>
                                ) : null}
                            </View>
                            <Text className="flex-1 text-sm leading-6 text-text-primary">
                                Chấp nhận điều khoản đặt vé & chính sách bảo mật
                                thông tin của DanaBus.
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>

                <FormControls
                    price={totalPrice}
                    onPress={handleSubmit}
                />
            </KeyboardAvoidingView>
        </View>
    );
}
