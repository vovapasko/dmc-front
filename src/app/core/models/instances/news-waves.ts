import { Character } from './character';
import { Method } from './method';
import { NewsProject } from './news-project';
import { Contractor } from './contractor';
import { Hashtag } from './hashtag';
import { WaveFormation } from './wave-formation';
import { News } from './news';
import { User } from './user.models';
import { Format } from './format';
import { NewsWavePrice } from '@models/instances/newsWavePrice';

export interface NewsWaves {
  postFormat?: string;
  id: number;
  newsCharacter: Character;
  format: Format;
  burstMethod: Method;
  project: NewsProject;
  contractors: Contractor[];
  waveFormation: WaveFormation;
  hashtags: Hashtag[];
  newsInProject: News[];
  createdBy: User;
  title: string;
  budget: number;
  isConfirmed?: boolean;
  newswavepricelistSet: NewsWavePrice[];
}
