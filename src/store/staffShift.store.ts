import type { IStop } from "@/models/stop";
import { create } from "zustand";

/**
 * UI state tạm cho ca đang chạy (điểm dừng / index).
 * Index đồng bộ với ActiveShift.currentStopOrder trên server.
 */
export type StaffShiftUiState = {
    stopIndex: number;
    stops: IStop[];
};

type StaffShiftState = {
    ui: StaffShiftUiState;
    setStops: (stops: IStop[], stopIndex?: number) => void;
    setStopIndex: (stopIndex: number) => void;
    advanceStop: () => void;
    resetUi: () => void;
};

const initialUi: StaffShiftUiState = {
    stopIndex: 0,
    stops: [],
};

const useStaffShiftStore = create<StaffShiftState>((set) => ({
    ui: initialUi,

    setStops: (stops, stopIndex = 0) =>
        set({
            ui: {
                stops,
                stopIndex: Math.min(
                    Math.max(stopIndex, 0),
                    Math.max(stops.length - 1, 0),
                ),
            },
        }),

    setStopIndex: (stopIndex) =>
        set((state) => ({
            ui: {
                ...state.ui,
                stopIndex: Math.min(
                    Math.max(stopIndex, 0),
                    Math.max(state.ui.stops.length - 1, 0),
                ),
            },
        })),

    advanceStop: () =>
        set((state) => {
            const maxIndex = Math.max(state.ui.stops.length - 1, 0);
            const nextIndex = Math.min(state.ui.stopIndex + 1, maxIndex);
            return {
                ui: {
                    ...state.ui,
                    stopIndex: nextIndex,
                },
            };
        }),

    resetUi: () => set({ ui: initialUi }),
}));

export default useStaffShiftStore;
