export class User {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    date_joined?: Date;
    date_updated?: Date;
    is_active?: boolean;
    is_confirmed?: boolean;
    avatar?: string;
    is_staff?: boolean;
    is_superuser?: boolean;
    token?: string;
    groups?: string;
    password?: string;
}

export class SignupResponse {
    status: boolean;
}

export class RegisterResponse {
    status: boolean;
}

export class ResetResponse {
    status: boolean;
}

//     email
//     first_name
//     last_name
//     date_joined
//     date_updated
//     is_active
//     is_confirmed
//     avatar
//     is_staff
//     is_superuser
//     token
