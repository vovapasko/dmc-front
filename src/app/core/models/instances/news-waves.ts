import { Character } from './character';
import { Method } from './method';
import { NewsProject } from './news-project';
import { Contractor } from './contractor';
import { Hashtag } from './hashtag';
import { WaveFormation } from './wave-formation';
import { News } from './news';
import { User } from './user.models';

export interface NewsWaves {
  id: number;
  newsCharacter: Character;
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
}