import { Token } from '../../instances/token.model';
import { User } from '../../instances/user.models';

export interface UpdateProfileResponse {
  avatar: string;
  firstName: string;
  lastName: string;
}
