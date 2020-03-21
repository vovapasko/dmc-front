import {User} from '../../user.models';
import {Token} from '../../token.model';

export interface LoginResponse {
    success: boolean;
    token?: Token;
    user?: User;
    errors?: any;
}
