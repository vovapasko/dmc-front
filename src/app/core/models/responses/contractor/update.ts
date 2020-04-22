import { Contractor } from '../../instances/contractor';

export interface UpdateContractorResponse {
  success: boolean;
  message?: {
    message: string;
  };
  errors?: object;
  contractor?: Contractor;
}
