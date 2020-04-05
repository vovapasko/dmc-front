export interface SignupPayload {
    data: {
        firstName: string;
        lastName: string;
        password: string;
        passwordConfirm: string;
    };
}
