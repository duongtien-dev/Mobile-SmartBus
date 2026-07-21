import { Platform } from "react-native";

import { NearbyMap as NativeMap } from "./NearbyMap.native";
import { NearbyMap as WebMap } from "./NearbyMap.web";

export const NearbyMap =
    Platform.OS === "web" ? WebMap : NativeMap;

