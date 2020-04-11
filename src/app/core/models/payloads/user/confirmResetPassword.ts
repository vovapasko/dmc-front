export interface ConfirmResetPasswordPayload {
    confirm: string;
    data: {
        password: string;
    };
}
