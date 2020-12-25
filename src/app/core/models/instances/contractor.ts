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
  onePostPrice: number;
  contractor: number;
}

export interface PostType {
  inner: string;
  inner_currency: string;
  outer: string;
  outer_currency: string;
}
