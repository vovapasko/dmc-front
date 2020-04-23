export interface Contractor {
  id: number;
  editorName: string;
  contactPerson: string;
  phoneNumber: string;
  email: string;
  arrangedNews: number;
  newsAmount: number;
  onePostPrice: number;
  dateCreated: Date;
  dateUpdated: Date;
}

export const emptyContractor = {
  id: 0,
  editorName: '',
  contactPerson: '',
  phoneNumber: '',
  email: '',
  arrangedNews: 0,
  newsAmount: 0,
  onePostPrice: 0,
  dateCreated: new Date(),
  dateUpdated: new Date(),
};
