export interface SignupPayload {
    invite: string;
    data: {
        firstName: string;
        lastName: string;
        password: string;
        passwordConfirm: string;
    };
}
