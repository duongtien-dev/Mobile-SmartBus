import type { UserRole } from "@/models/user";
import type { Href } from "expo-router";

/**
 * Home theo role.
 * Staff → `/staff` (Hub + Stack, không tabs passenger).
 */
export function navigateAuth(role?: UserRole | null): Href {
    if (role === "staff") {
        return "/staff" as Href;
    }

    return "/";
}
