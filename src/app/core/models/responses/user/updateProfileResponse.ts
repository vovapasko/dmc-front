import {Token} from '../../instances/token.model';
import {User} from '../../instances/user.models';

export interface UpdateProfileResponse {
    user?: User;
    token?: Token;
    status: number;
    errors?: string;
}
