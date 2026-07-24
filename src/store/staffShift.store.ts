import type { IStop } from "@/models/stop";
import { create } from "zustand";

export type StaffShiftSession = {
    shiftStartAt: string;
    routeId?: string;
    routeName?: string;
    routeCode?: string;
    stopIndex: number;
    stops: IStop[];
    scanCount: number;
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
    incrementScanCount: () => void;
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
                scanCount: 0,
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

    incrementScanCount: () =>
        set((state) => {
            if (!state.session) return state;
            return {
                session: {
                    ...state.session,
                    scanCount: state.session.scanCount + 1,
                },
            };
        }),

    endShift: () => set({ session: null }),
}));

export default useStaffShiftStore;
