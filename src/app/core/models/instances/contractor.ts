import { Comment } from '@models/instances/comment';
import { PublicationBlackList } from '@models/instances/publication-black-list';
import { Publication } from '@models/instances/publication';

export interface Contractor {
  id: number;
  editorName: string;
  contactPerson: string;
  phoneNumber: string;
  email: string;
  postformatlistSet: Array<PostFormatListSet>;
  contractorcommentlistSet: Array<Comment>;
  contractorpublicationsblacklistSet: Array<PublicationBlackList>;
  contractorpublicationslistSet: Array<Publication>;
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
  onePostPrice: PriceType;
  contractor: number;
}

export interface PriceType {
  inner: string;
  innerCurrency: string;
  outer: string;
  outerCurrency: string;
}
