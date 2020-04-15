import {Hashtag} from '../../models/instances/hashtag';
import {Format} from '../../models/instances/format';
import {Character} from '../../models/instances/character';
import {Method} from '../../models/instances/method';
import {Project} from '../../models/instances/project';
import {News} from "../../models/instances/news";

export interface INewsState {
    hashtags: Hashtag[];
    formats: Format[];
    characters: Character[];
    methods: Method[];
    projects: Project[];
    news: News[];
}

export const initialNewsState: INewsState = {
    hashtags: [],
    news: [],
    formats: [],
    characters: [],
    methods: [],
    projects: []
};
