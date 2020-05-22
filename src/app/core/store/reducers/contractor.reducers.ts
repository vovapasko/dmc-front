import { ContractorActions, EContractorActions } from '../actions/contractor.actions';
import { IContractorState, initialContractorState } from '../state/contractor.state';

export const contractorReducers = (state = initialContractorState, action: ContractorActions): IContractorState => {
  console.log(action);
  switch (action.type) {
    case EContractorActions.CreateContractorsSuccess:
      return {
        ...state,
        contractors: [...state.contractors, action.payload],
      };
    case EContractorActions.UpdateContractorsSuccess:
      return {
        ...state,
        contractors: state.contractors.map((el) => (el.id === action.payload.id ? action.payload : el)),
      };
    case EContractorActions.DeleteContractorsSuccess:
      return {
        ...state,
        contractors: state.contractors.filter((el) => el.id !== action.payload.id),
      };
    case EContractorActions.GetContractorsSuccess:
      return {
        ...state,
        contractors: action.payload
      };
    case EContractorActions.SelectContractorSuccess:
      return {
        ...state,
        selectedContractor: action.payload,
      };
    default:
      return state;
  }
};
