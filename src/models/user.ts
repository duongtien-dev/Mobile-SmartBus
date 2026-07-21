export type UserRole = 'admin' | 'staff' | 'user';

export interface IUser {
    _id: string;
    full_name: string;
    email: string;
    phone?: string;
    gender?: string;
    date_of_birth?: string | null;
    occupation?: string;
    province?: string;
    district?: string;
    ward?: string;
    address_detail?: string;
    is_priority_user?: boolean;
    priority_user?: string;
    image_proof?: string;
    role?: UserRole;
    active?: boolean;
    createdAt?: string;
    updatedAt?: string;
}
