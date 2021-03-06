import { Contractor } from '../../instances/contractor';

export interface GetAllContractorsResponse {
  success: boolean;
  message?: {
    message: string;
  };
  results?: Contractor[];
  count: number;
}
