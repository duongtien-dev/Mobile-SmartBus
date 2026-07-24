import type { UserRole } from "@/models/user";
import type { Href } from "expo-router";

/** Home route theo role sau login / khi đã authenticated vào auth screens */
export function getHomeHrefByRole(role?: UserRole | null): Href {
    if (role === "staff") {
        return "/staff" as Href;
    }

    return "/";
}
