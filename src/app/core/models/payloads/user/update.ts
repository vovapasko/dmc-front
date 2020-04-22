import { Groups } from '../../instances/groups';

export interface UpdatePayload {
  id: number;
  data: {
    group: Groups;
  };
}
