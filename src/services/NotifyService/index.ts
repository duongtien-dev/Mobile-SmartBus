import BaseService from "@/services/BaseService";

class NotifyService extends BaseService {
    constructor() {
        super("/notify");
    }

    registerDevice(body: { token: string; platform?: string }) {
        return this.post("/devices/register", body);
    }

    upsertSubscription(body: {
        routeId: string;
        stopId: string;
        notifyBeforeMinutes?: number;
        active?: boolean;
    }) {
        return this.post("/subscriptions/upsert", body);
    }

    listSubscriptions() {
        return this.post("/subscriptions/list", {});
    }

    deleteSubscription(body: {
        id?: string;
        routeId?: string;
        stopId?: string;
    }) {
        return this.post("/subscriptions/delete", body);
    }
}

export const notifyService = new NotifyService();
