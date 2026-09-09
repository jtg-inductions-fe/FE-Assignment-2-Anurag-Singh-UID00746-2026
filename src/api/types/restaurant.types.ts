export type FoodType = 'VEG' | 'NON_VEG';

export type WeekDay =
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY'
    | 'SUNDAY';

export interface AddressRequest {
    address_line_1: string;
    address_line_2?: string | null;
    city: string;
    state: string;
    postal_code: string;
    country: string;
}

export interface AddressUpdateRequest {
    address_line_1?: string | null;
    address_line_2?: string | null;
    city?: string | null;
    state?: string | null;
    postal_code?: string | null;
    country?: string | null;
}

export interface AddressResponse {
    id: string;
    address_line_1: string;
    address_line_2: string | null;
    city: string;
    state: string;
    postal_code: string;
    country: string;
}

export interface RestaurantRequest {
    name: string;
    image_url?: string | null;
    description?: string | null;
    contact_number: string;
    opening_time: string;
    closing_time: string;
    working_days: WeekDay[];
    type: FoodType;
    cuisine: string;
    country_code?: string | null;
    address: AddressRequest;
}

export interface RestaurantUpdateRequest {
    name?: string | null;
    image_url?: string | null;
    description?: string | null;
    contact_number?: string | null;
    opening_time?: string | null;
    closing_time?: string | null;
    working_days?: WeekDay[] | null;
    type?: FoodType | null;
    cuisine?: string | null;
    country_code?: string | null;
    address?: AddressRequest | null;
}

export interface Restaurant {
    id: string;
    owner_id: string;
    name: string;
    image_url: string | null;
    description: string | null;
    contact_number: string;
    opening_time: string;
    closing_time: string;
    working_days: WeekDay[];
    type: FoodType;
    cuisine: string;
    country_code: string | null;
    address: AddressResponse | null;
}

export interface PaginationRequest {
    limit?: number;
    cursor?: string;
    q?: string;
    type?: FoodType;
}

export interface PaginationResponse<T> {
    items: T[];
    next_cursor: string | null;
    has_next: boolean;
}
