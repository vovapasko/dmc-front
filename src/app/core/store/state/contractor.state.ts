import { Contractor } from '../../models/instances/contractor';

export interface IContractorState {
  contractors: Contractor[];
  selectedContractor: Contractor;
}

export const initialContractorState: IContractorState = {
  contractors: [],
  selectedContractor: null,
};
