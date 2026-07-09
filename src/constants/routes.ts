/**
 * Central route paths for Expo Router.
 *
 * Convention:
 * - `tabs`   → bottom tab screens only (no nested stacks)
 * - `pages`  → pushed/stack screens (detail, list, forms…)
 * - `auth`   → login flow
 *
 * See docs/ROUTING.md for full structure.
 */
export const ROUTES = {
    tabs: {
        home: "/",
        notifications: "/notifications",
        scan: "/scan",
        payment: "/payment",
        profile: "/profile",
    },
    pages: {
        noticeList: "/notice/list",
        paymentAdd: "/payment/add",
        noticeDetail: (id: string) => `/notice/${id}`,
    },
    auth: {
        login: "/login",
        register: "/register",
    },
} as const;
