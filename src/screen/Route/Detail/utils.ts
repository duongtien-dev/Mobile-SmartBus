import type { IRoute } from "@/models/route";

export function getRouteTitle(route: Pick<IRoute, "name" | "startName" | "endName" | "code">) {
    if (route.name?.trim()) return route.name;

    if (route.startName && route.endName) {
        return `${route.startName} - ${route.endName}`;
    }

    return route.code;
}

export function deriveOperatingHours(times: string[]) {
    if (!times.length) return null;

    const sorted = [...times].sort((a, b) => a.localeCompare(b));
    return `${sorted[0]} - ${sorted[sorted.length - 1]}`;
}

export function collectScheduleTimes(timesList: string[][]) {
    const unique = new Set<string>();

    timesList.forEach((times) => {
        times.forEach((time) => {
            if (time.trim()) unique.add(time.trim());
        });
    });

    return [...unique].sort((a, b) => a.localeCompare(b));
}
