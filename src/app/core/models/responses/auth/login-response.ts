import { User } from '../../instances/user.models';
import { Token } from '../../instances/token.model';

export interface LoginResponse {
  success: boolean;
  token?: Token;
  user?: User;
  errors?: any;
}
