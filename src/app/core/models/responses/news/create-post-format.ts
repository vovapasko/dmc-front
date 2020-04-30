import { Format } from '../../instances/format';

export interface CreatePostFormatResponse {
  success: boolean;
  errors?: {
    postFormat: Array<string>;
  };
  message: {
    message: string;
  };
  postMethod?: Format;
}
