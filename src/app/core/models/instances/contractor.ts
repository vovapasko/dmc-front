export interface Contractor {
    id: number;
    editor_name: string;
    contact_person: string;
    phone_number: string;
    email: string;
    budget: number;
    money_spent: number;
    one_post_price: number;
    date_created: Date;
    date_updated: Date;
}

export const emptyContractor = {
    id: 0,
    editor_name: '',
    contact_person: '',
    phone_number: '',
    email: '',
    budget: 0,
    money_spent: 0,
    one_post_price: 0,
    date_created: new Date(),
    date_updated: new Date()
};
