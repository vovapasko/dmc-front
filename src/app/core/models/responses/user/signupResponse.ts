import {User} from '../../instances/user.models';
import {Token} from '../../instances/token.model';

export interface SignupResponse {
    status: number;
    token?: Token;
    user?: User;
    error?: string;
}
