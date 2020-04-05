import Contractor from '../../models/instances/contractor.models';

export interface IContractorState {
    contractors: Contractor[];
    selectedContractor: Contractor;
}

export const initialContractorState: IContractorState = {
    contractors: null,
    selectedContractor: null
};
