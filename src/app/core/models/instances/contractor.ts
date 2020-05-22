export interface Contractor {
  id: number;
  editorName: string;
  contactPerson: string;
  phoneNumber: string;
  email: string;
  postformatlistSet: Array<PostFormatListSet>
  dateCreated: Date;
  dateUpdated: Date;
}

export interface PostFormatListSet {
  id: number;
  dateCreated: string;
  dateUpdated: string;
  postFormat: string;
  newsAmount: number;
  arrangedNews: number;
  onePostPrice: number;
  contractor: number;
}