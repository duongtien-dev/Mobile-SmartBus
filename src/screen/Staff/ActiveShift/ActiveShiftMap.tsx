import { Platform } from "react-native";

import { ActiveShiftMap as NativeMap } from "./ActiveShiftMap.native";
import { ActiveShiftMap as WebMap } from "./ActiveShiftMap.web";

export type { MapPoint } from "./mapTypes";

export const ActiveShiftMap =
    Platform.OS === "web" ? WebMap : NativeMap;
