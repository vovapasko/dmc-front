export interface Contractor {
    id: number;
    editor_name: string;
    contact_person: string;
    phone_number: string;
    email: string;
    arranged_news: number;
    news_amount: number;
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
    arranged_news: 0,
    news_amount: 0,
    one_post_price: 0,
    date_created: new Date(),
    date_updated: new Date()
};
