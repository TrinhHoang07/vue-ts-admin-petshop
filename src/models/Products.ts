export interface Products {
    id: number;
    name: string;
    description?: string;
    sub_description?: string;
    type: string;
    rate: number;
    price: number;
    quantity: number;
    color?: string;
    preview_url: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export interface Customers {
    id: number;
    name: string;
    gender: string;
    email: string;
    address: string;
    phoneNumber: string;
    birthDate: string;
    avatarPath: string;
}
