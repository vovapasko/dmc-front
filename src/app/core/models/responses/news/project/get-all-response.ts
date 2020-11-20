import { Contractor } from '@models/instances/contractor';
import { Hashtag } from '@models/instances/hashtag';
import { Format } from '@models/instances/format';
import { Character } from '@models/instances/character';
import { Method } from '@models/instances/method';

export interface GetAllResponse {
  success: boolean;
  message?: {
    message: string;
  };
  contractors: Contractor[];
  hashtags: Hashtag[];
  formats: Format[];
  characters: Character[];
  burstMethods: Method[];
}
