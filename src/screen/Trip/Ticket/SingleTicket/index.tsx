import { PageHeader } from "@/components/PageHeader";
import useTripBookingStore, {
    computeSingleTicketPrice,
} from "@/store/tripBooking.store";
import { router } from "expo-router";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    View,
} from "react-native";
import { LocationInfo } from "../Element/LocationInfo";
import { FormControls } from "../Element/FormControls";
import { TicketInfo } from "./TicketInfo";
import { InputTime } from "./InputTime";
import { InputSeat } from "./InputSeat";
import { InputTerm } from "./InputTerm";

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
    const formData = useTripBookingStore((state) => state.singleForm);
    const handleChangForm = useTripBookingStore(
        (state) => state.updateSingleForm,
    );
    const setTotalPrice = useTripBookingStore((state) => state.setTotalPrice);

    const originName = searchContext?.originName;
    const destinationName = searchContext?.destinationName;

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
                    <TicketInfo
                        pickupStopName={pickupStopName}
                        departureDate={formData.departureDate}
                    />
                    <View className="flex-row gap-3">
                        <InputTime
                            value={formData.departureTime}
                            onChange={(value) =>
                                handleChangForm({ departureTime: value })
                            }
                            options={TIME_OPTIONS}
                        />
                        <InputSeat
                            value={formData.seatCount || "1"}
                            onChange={(value) =>
                                handleChangForm({ seatCount: value })
                            }
                            options={SEAT_OPTIONS}
                        />
                    </View>
                    <InputTerm
                        value={formData.acceptedTerms}
                        onChange={(value) =>
                            handleChangForm({ acceptedTerms: value })
                        }
                    />
                </ScrollView>
                <FormControls price={totalPrice} onPress={handleSubmit} />
            </KeyboardAvoidingView>
        </View>
    );
}
