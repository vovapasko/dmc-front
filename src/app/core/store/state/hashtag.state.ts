import { Hashtag } from '@models/instances/hashtag';

export interface IHashtagState {
  hashtags: Hashtag[];
  selectedHashtag: Hashtag;
}

export const initialHashtagState: IHashtagState = {
  hashtags: [],
  selectedHashtag: null,
};
