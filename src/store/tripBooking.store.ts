import type { ITicket, TicketType } from "@/models/ticket";
import type { ITicketProduct } from "@/models/ticketProduct";
import type { ISuggestLocation } from "@/models/suggestLocation";
import type { ITripLocation } from "@/models/trip";
import moment, { now } from "moment";
import { create } from "zustand";

/** Snapshot tuyến/điểm dừng lúc chọn chuyến — đủ để tạo vé. */
export type IBookingSelection = {
    routeId: string;
    routeCode: string;
    startStopName: string;
    endStopName: string;
};

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
    acceptedTerms: false,
};

const initialMonthlyForm: IMonthlyTicketForm = {
    usageMonth: moment(now()).format("MM/YYYY"),
    ticketCount: "1",
};

type TripBookingState = {
    searchContext: ISearchContext | null;
    prefillOrigin: ISuggestLocation | null;
    bookingSelection: IBookingSelection | null;
    ticketType: TicketType | null;
    selectedTicketProduct: ITicketProduct | null;
    singleForm: ISingleTicketForm;
    monthlyForm: IMonthlyTicketForm;
    selectedPaymentMethodId: string;
    totalPrice: number;
    lastPurchasedTicket: ITicket | null;
    /** Tăng khi reset booking — Home clear ô điểm đi/đến */
    homeSearchResetKey: number;

    setSearchContext: (context: ISearchContext) => void;
    setPrefillOrigin: (origin: ISuggestLocation) => void;
    clearPrefillOrigin: () => void;
    setBookingSelection: (selection: IBookingSelection) => void;
    setTicketType: (product: ITicketProduct) => void;
    updateSingleForm: (data: Partial<ISingleTicketForm>) => void;
    updateMonthlyForm: (data: Partial<IMonthlyTicketForm>) => void;
    setSelectedPaymentMethodId: (id: string) => void;
    setTotalPrice: (price: number) => void;
    setLastPurchasedTicket: (ticket: ITicket | null) => void;
    getTicketLabel: () => string;
    resetBooking: () => void;
};

const clearedSelection = {
    bookingSelection: null as IBookingSelection | null,
    ticketType: null as TicketType | null,
    selectedTicketProduct: null as ITicketProduct | null,
    singleForm: initialSingleForm,
    monthlyForm: initialMonthlyForm,
    selectedPaymentMethodId: "",
    totalPrice: 0,
};

const useTripBookingStore = create<TripBookingState>((set, get) => ({
    searchContext: null,
    prefillOrigin: null,
    bookingSelection: null,
    ticketType: null,
    selectedTicketProduct: null,
    singleForm: initialSingleForm,
    monthlyForm: initialMonthlyForm,
    selectedPaymentMethodId: "",
    totalPrice: 0,
    lastPurchasedTicket: null,
    homeSearchResetKey: 0,

    setSearchContext: (context) =>
        set({
            searchContext: context,
            ...clearedSelection,
        }),

    setPrefillOrigin: (origin) => set({ prefillOrigin: origin }),

    clearPrefillOrigin: () => set({ prefillOrigin: null }),

    setBookingSelection: (selection) =>
        set({
            bookingSelection: selection,
            ticketType: null,
            selectedTicketProduct: null,
            singleForm: initialSingleForm,
            monthlyForm: initialMonthlyForm,
            selectedPaymentMethodId: "",
            totalPrice: 0,
        }),

    setTicketType: (product) =>
        set({
            ticketType: product.code,
            selectedTicketProduct: product,
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

    setLastPurchasedTicket: (ticket) => set({ lastPurchasedTicket: ticket }),

    getTicketLabel: () => {
        const { selectedTicketProduct, ticketType } = get();
        if (selectedTicketProduct?.title) return selectedTicketProduct.title;

        switch (ticketType) {
            case "single":
                return "Vé lượt";
            case "monthlySingleRoute":
                return "Vé tháng đơn tuyến";
            case "monthlyInterRoute":
                return "Vé tháng liên tuyến";
            default:
                return "Vé";
        }
    },

    resetBooking: () =>
        set((state) => ({
            searchContext: null,
            prefillOrigin: null,
            ...clearedSelection,
            homeSearchResetKey: state.homeSearchResetKey + 1,
        })),
}));

export function computeSingleTicketPrice(unitPrice?: number) {
    return unitPrice ?? 0;
}

export function computeMonthlyTicketPrice(ticketCount: string, unitPrice?: number) {
    const count = Number(ticketCount) || 1;
    return (unitPrice ?? 0) * count;
}

export default useTripBookingStore;
