export class Token {
    access: string;
    refresh: string;
}

export enum TokenTypes {
    access,
    refresh
}
