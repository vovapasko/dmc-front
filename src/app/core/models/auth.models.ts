export class User {
    id: number;
    username?: string;
    password: string;
    firstName: string;
    lastName: string;
    token?: string;
    email: string;
    groups_cascade_down: string[];
}
