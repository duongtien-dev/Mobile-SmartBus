import { Platform } from "react-native";

import { RouteDetailMap as NativeMap } from "./RouteDetailMap.native";
import { RouteDetailMap as WebMap } from "./RouteDetailMap.web";

export const RouteDetailMap =
    Platform.OS === "web" ? WebMap : NativeMap;

