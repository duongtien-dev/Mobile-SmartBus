import type { IStop } from "@/models/stop";
import { create } from "zustand";

/**
 * UI state tạm cho ca đang chạy (điểm dừng / index).
 * Phiên ca + lịch sử quét lấy từ API (`staff-shifts`, `scan-logs`).
 */
export type StaffShiftUiState = {
    stopIndex: number;
    stops: IStop[];
};

type StaffShiftState = {
    ui: StaffShiftUiState;
    setStops: (stops: IStop[]) => void;
    advanceStop: () => void;
    resetUi: () => void;
};

const initialUi: StaffShiftUiState = {
    stopIndex: 0,
    stops: [],
};

const useStaffShiftStore = create<StaffShiftState>((set) => ({
    ui: initialUi,

    setStops: (stops) =>
        set({
            ui: {
                stops,
                stopIndex: 0,
            },
        }),

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
