import { Publication } from '@models/instances/publication';
import { PublicationBlackList } from '@models/instances/publication-black-list';
import { Comment } from '@models/instances/comment';

export interface IPublicationState {
  publications: Publication[];
  publicationBlackList: PublicationBlackList[];
  comments: Comment[];
}

export const initialPublicationState: IPublicationState = {
  publications: [],
  publicationBlackList: [],
  comments: []
};
