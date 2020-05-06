import { User } from '../../instances/user.models';

export interface GetAllResponse {
  success: boolean;
  message: { message: string };
  results: User[];
  count: number;
}

export interface GetAllUsersResponse {
  success: boolean;
  message: { message: string };
  results: User[];
  count: number;
}
