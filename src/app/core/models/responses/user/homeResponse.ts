import {User} from '../../instances/user.models';

export interface HomeResponse {
    success: boolean;
    message: {message: string};
    data: User[];
}

export interface GetAllUsersResponse {
    success: boolean;
    message: {message: string};
    data: User[];
}
