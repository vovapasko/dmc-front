import {Token} from './token.model';

export class User {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    date_joined?: Date;
    date_updated?: Date;
    is_active?: boolean;
    is_confirmed?: boolean;
    avatar?: string;
    is_staff?: boolean;
    is_superuser?: boolean;
    token?: Token;
    groups?: string;
    password?: string;
    groups_cascade_down?: string[];
}
