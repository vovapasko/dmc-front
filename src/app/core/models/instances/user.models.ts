import {Token} from './token.model';

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
    groupsCascadeDown?: string[];
}

export const EmptyUser: User = {
    avatar: '',
    id: '',
    email: ''
};
