import { Hashtag } from '../../models/instances/hashtag';
import { Format } from '../../models/instances/format';
import { Character } from '../../models/instances/character';
import { Method } from '../../models/instances/method';
import { Project } from '../../models/instances/project';
import { News } from '../../models/instances/news';
import { Contractor, PostFormatListSet } from '../../models/instances/contractor';

export interface INewsState {
  hashtags: Hashtag[];
  contractors: Contractor[];
  formats: Format[];
  formatsList: PostFormatListSet[];
  characters: Character[];
  methods: Method[];
  projects: Project[];
  news: News[];
  project: Project;
}

export const initialNewsState: INewsState = {
  hashtags: [],
  news: [],
  formats: [],
  characters: [],
  methods: [],
  projects: [],
  contractors: [],
  formatsList: [],
  project: null,
};
