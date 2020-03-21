export interface RegisterResponse {
    success: boolean;
    errors?: {
        email?: string,
        permission?: string
    };
}
