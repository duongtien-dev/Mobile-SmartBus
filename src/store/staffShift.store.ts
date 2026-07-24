import type { IStop } from "@/models/stop";
import { create } from "zustand";

export type StaffScanLogItem = {
    id: string;
    qrCode: string;
    isValid: boolean;
    reason: string;
    scannedAt: string;
    customerName?: string;
    routeName?: string;
};

export type StaffShiftSession = {
    shiftStartAt: string;
    routeId?: string;
    routeName?: string;
    routeCode?: string;
    stopIndex: number;
    stops: IStop[];
    scanLogs: StaffScanLogItem[];
};

type StaffShiftState = {
    session: StaffShiftSession | null;
    startShift: (payload: {
        routeId?: string;
        routeName?: string;
        routeCode?: string;
    }) => void;
    setStops: (stops: IStop[]) => void;
    advanceStop: () => void;
    addScanLog: (
        payload: Omit<StaffScanLogItem, "id" | "scannedAt">,
    ) => void;
    endShift: () => void;
};

const useStaffShiftStore = create<StaffShiftState>((set) => ({
    session: null,

    startShift: ({ routeId, routeName, routeCode }) =>
        set({
            session: {
                shiftStartAt: new Date().toISOString(),
                routeId,
                routeName,
                routeCode,
                stopIndex: 0,
                stops: [],
                scanLogs: [],
            },
        }),

    setStops: (stops) =>
        set((state) => {
            if (!state.session) return state;
            return {
                session: {
                    ...state.session,
                    stops,
                    stopIndex: 0,
                },
            };
        }),

    advanceStop: () =>
        set((state) => {
            if (!state.session) return state;
            const maxIndex = Math.max(state.session.stops.length - 1, 0);
            const nextIndex = Math.min(state.session.stopIndex + 1, maxIndex);
            return {
                session: {
                    ...state.session,
                    stopIndex: nextIndex,
                },
            };
        }),

    addScanLog: (payload) =>
        set((state) => {
            if (!state.session) return state;
            const item: StaffScanLogItem = {
                ...payload,
                id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                scannedAt: new Date().toISOString(),
            };
            return {
                session: {
                    ...state.session,
                    scanLogs: [item, ...state.session.scanLogs],
                },
            };
        }),

    endShift: () => set({ session: null }),
}));

export default useStaffShiftStore;
