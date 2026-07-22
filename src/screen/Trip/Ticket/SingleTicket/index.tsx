import { Select } from "@/components/Select";
import { PageHeader } from "@/components/PageHeader";
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
import { LocationInfo } from "../Element/LocationInfo";
import { FormControls } from "../Element/FormControls";
import { DepartureInfo } from "./DepartureInfo";
import { InputTime } from "./InputTime";
import { InputSeat } from "./InputSeat";
import { InputCustomer } from "./InputCustomer";

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
                    <LocationInfo
                        originName={originName}
                        destinationName={destinationName}
                    />

                    <DepartureInfo
                        displayPickupStop={displayPickupStop}
                        departureDate={departureDate}
                    />

                    <View className="flex-row gap-3">
                        <InputTime
                            value={departureTime}
                            onChange={(value) => updateSingleForm({ departureTime: value })}
                            options={TIME_OPTIONS}
                        />

                        <InputSeat
                            value={seatCount}
                            onChange={(value) => updateSingleForm({ seatCount: value })}
                            options={SEAT_OPTIONS}
                        />
                    </View>

                    <InputCustomer
                        fullName={fullName}
                        phoneNumber={phoneNumber}
                        onChangeName={(value) => updateSingleForm({ fullName: value })}
                        onChangePhoneNumber={(value) => updateSingleForm({ phoneNumber: value })}
                    />

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
                            <View className={`mt-0.5 h-5 w-5 items-center justify-center rounded border-2 ${acceptedTerms
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
