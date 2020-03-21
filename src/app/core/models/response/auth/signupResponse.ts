import {User} from '../../user.models';
import {Token} from '../../token.model';

export interface SignupResponse {
    status: number;
    token: Token;
    user: User;
}
