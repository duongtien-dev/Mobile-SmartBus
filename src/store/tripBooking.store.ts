import type { TicketTypeId } from "@/constants/ticket";
import {
    MONTHLY_TICKET_PRICE,
    SINGLE_TICKET_PRICE,
} from "@/constants/ticket";
import type { ISuggestLocation } from "@/models/suggestLocation";
import type { ITrip, ITripLocation } from "@/models/trip";
import moment, { now } from "moment";
import { create } from "zustand";

export interface ISearchContext {
    originName: string;
    destinationName: string;
    origin: ITripLocation;
    destination: ITripLocation;
}

export interface ISingleTicketForm {
    departureDate: string;
    departureTime: string;
    seatCount: string;
    fullName: string;
    phoneNumber: string;
    acceptedTerms: boolean;
}

export interface IMonthlyTicketForm {
    usageMonth: string;
    ticketCount: string;
}

const initialSingleForm: ISingleTicketForm = {
    departureDate: moment(now()).format("DD/MM/YYYY"),
    departureTime: "",
    seatCount: "1",
    fullName: "",
    phoneNumber: "",
    acceptedTerms: false,
};

const initialMonthlyForm: IMonthlyTicketForm = {
    usageMonth: moment(now()).format("MM/YYYY"),
    ticketCount: "",
};

type TripBookingState = {
    searchContext: ISearchContext | null;
    prefillOrigin: ISuggestLocation | null;
    selectedTrip: ITrip | null;
    pickupStopName: string;
    routeCode: string;
    ticketType: TicketTypeId | null;
    singleForm: ISingleTicketForm;
    monthlyForm: IMonthlyTicketForm;
    selectedPaymentMethodId: string;
    totalPrice: number;

    setSearchContext: (context: ISearchContext) => void;
    setPrefillOrigin: (origin: ISuggestLocation) => void;
    clearPrefillOrigin: () => void;
    setSelectedTrip: (
        trip: ITrip,
        pickupStopName: string,
        routeCode: string,
    ) => void;
    setTicketType: (type: TicketTypeId) => void;
    updateSingleForm: (data: Partial<ISingleTicketForm>) => void;
    updateMonthlyForm: (data: Partial<IMonthlyTicketForm>) => void;
    setSelectedPaymentMethodId: (id: string) => void;
    setTotalPrice: (price: number) => void;
    getTicketLabel: () => string;
    resetBooking: () => void;
};

const useTripBookingStore = create<TripBookingState>((set, get) => ({
    searchContext: null,
    prefillOrigin: null,
    selectedTrip: null,
    pickupStopName: "",
    routeCode: "",
    ticketType: null,
    singleForm: initialSingleForm,
    monthlyForm: initialMonthlyForm,
    selectedPaymentMethodId: "",
    totalPrice: 0,

    setSearchContext: (context) =>
        set({
            searchContext: context,
            selectedTrip: null,
            pickupStopName: "",
            routeCode: "",
            ticketType: null,
            singleForm: initialSingleForm,
            monthlyForm: initialMonthlyForm,
            selectedPaymentMethodId: "",
            totalPrice: 0,
        }),

    setPrefillOrigin: (origin) => set({ prefillOrigin: origin }),

    clearPrefillOrigin: () => set({ prefillOrigin: null }),

    setSelectedTrip: (trip, pickupStopName, routeCode) =>
        set({
            selectedTrip: trip,
            pickupStopName,
            routeCode,
            ticketType: null,
            singleForm: initialSingleForm,
            monthlyForm: initialMonthlyForm,
            selectedPaymentMethodId: "",
            totalPrice: 0,
        }),

    setTicketType: (type) =>
        set({
            ticketType: type,
            selectedPaymentMethodId: "",
            totalPrice: 0,
        }),

    updateSingleForm: (data) =>
        set((state) => ({
            singleForm: { ...state.singleForm, ...data },
        })),

    updateMonthlyForm: (data) =>
        set((state) => ({
            monthlyForm: { ...state.monthlyForm, ...data },
        })),

    setSelectedPaymentMethodId: (id) => set({ selectedPaymentMethodId: id }),

    setTotalPrice: (price) => set({ totalPrice: price }),

    getTicketLabel: () => {
        const { ticketType } = get();

        switch (ticketType) {
            case "single":
                return "Vé lượt";
            case "monthly-single":
                return "Vé tháng đơn tuyến";
            case "monthly-multi":
                return "Vé tháng liên tuyến";
            default:
                return "Vé";
        }
    },

    resetBooking: () =>
        set({
            searchContext: null,
            prefillOrigin: null,
            selectedTrip: null,
            pickupStopName: "",
            routeCode: "",
            ticketType: null,
            singleForm: initialSingleForm,
            monthlyForm: initialMonthlyForm,
            selectedPaymentMethodId: "",
            totalPrice: 0,
        }),
}));

export function computeSingleTicketPrice() {
    return SINGLE_TICKET_PRICE;
}

export function computeMonthlyTicketPrice(ticketCount: string) {
    const count = Number(ticketCount) || 1;
    return MONTHLY_TICKET_PRICE * count;
}

export default useTripBookingStore;
