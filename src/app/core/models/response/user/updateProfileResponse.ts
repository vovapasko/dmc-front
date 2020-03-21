import {Token} from '../../token.model';
import {User} from '../../user.models';

export interface UpdateProfileResponse {
    user?: User;
    token?: Token;
    status: number;
    errors?: string;
}
