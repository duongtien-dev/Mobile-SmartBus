export interface IPost {
    _id: string;
    title: string;
    summary?: string;
    content?: string;
    images?: string[];
    category?: string;
    related_routes?: string[];
    related_stops?: string[];
    user:
    | string
    | {
        _id: string;
        full_name: string;
        email: string;
    };
    createdAt: string;
    updatedAt: string;
}
