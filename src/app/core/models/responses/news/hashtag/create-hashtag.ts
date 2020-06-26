import { Hashtag } from '../../../instances/hashtag';

export interface CreateHashtagResponse {
  success: boolean;
  errors?: {
    name: Array<string>;
  };
  message: {
    message: string;
  };
  hashtag?: Hashtag;
}
