import {Token} from './token.model';
import {Groups} from './groups';

export class User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    dateJoined?: Date;
    dateUpdated?: Date;
    isActive?: boolean;
    isConfirmed?: boolean;
    avatar?: string;
    isStaff?: boolean;
    isSuperuser?: boolean;
    token?: Token;
    groups?: string;
    password?: string;
    groupsCascadeDown?: Groups[];
}

export const EmptyUser: User = {
    avatar: '',
    id: '',
    email: ''
};

