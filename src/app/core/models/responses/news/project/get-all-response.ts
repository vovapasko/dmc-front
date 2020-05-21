import { Contractor } from '../../../instances/contractor';
import { Hashtag } from '../../../instances/hashtag';
import { Format } from '../../../instances/format';
import { Character } from '../../../instances/character';
import { Method } from '../../../instances/method';

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
