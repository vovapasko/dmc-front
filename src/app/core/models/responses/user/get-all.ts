import {User} from '../../instances/user.models';

export interface GetAllResponse {
    success: boolean;
    message: {message: string};
    data: User[];
}

export interface GetAllUsersResponse {
    success: boolean;
    message: {message: string};
    data: User[];
}
