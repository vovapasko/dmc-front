import { Format } from '../../../instances/format';

export interface CreatePostsFormatResponse {
  success: boolean;
  errors?: {
    postFormat: Array<string>;
  };
  message: {
    message: string;
  };
  postMethod?: Format;
}
