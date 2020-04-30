import { Contractor } from '../../instances/contractor';

export interface CreateContractorResponse {
  success: boolean;
  message?: {
    message: string;
  };
  errors?: object;
  contractor?: Contractor;
}
