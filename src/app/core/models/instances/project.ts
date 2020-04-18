import {Character} from './character';
import {Format} from './format';
import {Method} from './method';
import {Contractor} from './contractor';
import {News} from './news';
import {Hashtag} from './hashtag';

export interface Project {
    newsCharacter: Character;
    projectPostFormat: Format;
    projectBurstMethod: Method;
    clientName: string;
    projectName: string;
    projectTitle: string;
    projectBudget: number;
    isConfirmed?: boolean;
    projectContractors: Contractor[];
    content: {
        text: string;
    };
    progress?: number;
    newsInProject: News[];
    projectHashtags: Hashtag[];
    dateCreated?: Date;
    dateUpdated?: Date;
}
