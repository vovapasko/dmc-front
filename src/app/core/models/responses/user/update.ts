import {User} from '../../instances/user.models';

export interface UpdateResponse {
    success: boolean;
    message?: {
        message: string,
        user?: User;
    };
}
