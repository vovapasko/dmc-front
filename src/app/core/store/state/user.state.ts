import User from '../../models/instances/user.models';

export interface IUserState {
    users: User[];
    selectedUser: User;
}

export const initialUserState: IUserState = {
    users: null,
    selectedUser: null
};
