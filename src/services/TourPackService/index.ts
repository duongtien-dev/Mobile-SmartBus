import BaseService from "@/services/BaseService";

export type TourPack = {
    id: string;
    title: string;
    description: string;
    howToBuy: string;
    pois: { name: string; lat: number; lng: number }[];
    suggestedRouteCodes: string[];
    faqKeys: string[];
};

class TourPackService extends BaseService {
    constructor() {
        super("/tour-packs");
    }

    list(body: { locale?: string } = {}) {
        return this.post("/list", body);
    }

    detail(body: { id: string; locale?: string }) {
        return this.post("/detail", body);
    }
}

export const tourPackService = new TourPackService();
