export interface IStopLocation {
    type: "Point";
    coordinates: [number, number];
}

export interface IStop {
    _id: string;
    routeId: string;
    stopCode: string;
    name: string;
    location?: IStopLocation;
    times?: string[];
    order: number;
    createdAt?: string;
    updatedAt?: string;
}
