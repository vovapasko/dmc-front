import { EmailActions } from '@store/actions/email.actions';
import { IEmailState, initialEmailState } from '@store/state/email.state';

export const emailReducers = (state = initialEmailState, action: EmailActions): IEmailState => {
  // console.log(action);
  switch (action.type) {
    default:
      return state;
  }
};
