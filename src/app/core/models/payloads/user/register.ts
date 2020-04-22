import { Groups } from '../../instances/groups';

export interface RegisterPayload {
  data: {
    group: Groups;
    email: string;
  };
}
