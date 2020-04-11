import {User} from '../../instances/user.models';

export interface RegisterResponse {
    success: boolean;
    user: User;
    errors?: {
        email?: string,
        permission?: string
    };
}
