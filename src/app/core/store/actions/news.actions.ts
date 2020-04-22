import {Action} from '@ngrx/store';
import {Hashtag} from '../../models/instances/hashtag';
import {Character} from '../../models/instances/character';
import {Method} from '../../models/instances/method';
import {Format} from '../../models/instances/format';
import {Contractor} from '../../models/instances/contractor';
import {Project} from '../../models/instances/project';

export enum ENewsActions {
    GetProjectConfiguration = '[News] Get project configuration',
    GetProject = '[News] Get project',
    GetProjectSuccess = '[News] Get project success',
    UpdateProject = '[News] Update project',
    UpdateProjectSuccess = '[News] Update project success',
    GetProjects = '[News] Get projects',
    GetProjectsSuccess = '[News] Get projects success',
    CreateProject = '[News] Create project',
    CreateProjectSuccess = '[News] Create project success',
    GetContractorsSuccess = '[News] Get contractors success',
    GetHashtagsSuccess = '[News] Get hashtags success',
    GetFormatsSuccess = '[News] Get formats success',
    GetCharactersSuccess = '[News] Get characters success',
    GetMethodsSuccess = '[News] Get methods success',
    CreateHashtag = '[News] Create hashtag',
    CreateHashtagSuccess = '[News] Create hashtag success',
    CreateFormat = '[News] Create format',
    CreateFormatSuccess = '[News] Create format success'
}


export class GetProject implements Action {
    public readonly type = ENewsActions.GetProject;

    constructor(public payload) {
    }
}

export class UpdateProject implements Action {
    public readonly type = ENewsActions.UpdateProject;

    constructor(public payload) {
    }
}

export class UpdateProjectSuccess implements Action {
    public readonly type = ENewsActions.UpdateProjectSuccess;

    constructor(public payload) {
    }
}

export class GetProjects implements Action {
    public readonly type = ENewsActions.GetProjects;

    constructor() {
    }
}

export class GetProjectsSuccess implements Action {
    public readonly type = ENewsActions.GetProjectsSuccess;

    constructor(public payload: Project[]) {
    }
}

export class CreateProject implements Action {
    public readonly type = ENewsActions.CreateProject;

    constructor(public payload) {
    }
}

export class CreateProjectSuccess implements Action {
    public readonly type = ENewsActions.CreateProjectSuccess;

    constructor(public payload) {
    }
}

export class GetProjectConfiguration implements Action {
    public readonly type = ENewsActions.GetProjectConfiguration;

    constructor() {
    }
}

export class GetProjectSuccess implements Action {
    public readonly type = ENewsActions.GetProjectSuccess;

    constructor(public payload: Project) {
    }
}

export class GetHashtagsSuccess implements Action {
    public readonly type = ENewsActions.GetHashtagsSuccess;

    constructor(public payload: Hashtag[]) {
    }
}

export class GetContractorsSuccess implements Action {
    public readonly type = ENewsActions.GetContractorsSuccess;

    constructor(public payload: Contractor[]) {
    }
}

export class GetCharactersSuccess implements Action {
    public readonly type = ENewsActions.GetCharactersSuccess;

    constructor(public payload: Character[]) {
    }
}

export class GetMethodsSuccess implements Action {
    public readonly type = ENewsActions.GetMethodsSuccess;

    constructor(public payload: Method[]) {
    }
}

export class GetFormatsSuccess implements Action {
    public readonly type = ENewsActions.GetFormatsSuccess;

    constructor(public payload: Format[]) {
    }
}

export class CreateHashtag implements Action {
    public readonly type = ENewsActions.CreateHashtag;

    constructor(public payload) {
    }
}

export class CreateHashtagSuccess implements Action {
    public readonly type = ENewsActions.CreateHashtagSuccess;

    constructor(public payload: Hashtag) {
    }
}

export class CreateFormat implements Action {
    public readonly type = ENewsActions.CreateFormat;

    constructor(public payload) {
    }
}

export class CreateFormatSuccess implements Action {
    public readonly type = ENewsActions.CreateFormatSuccess;

    constructor(public payload: Format) {
    }
}

export type NewsActions =
    | CreateFormat
    | CreateFormatSuccess
    | CreateHashtag
    | CreateHashtagSuccess
    | GetCharactersSuccess
    | GetFormatsSuccess
    | GetHashtagsSuccess
    | GetMethodsSuccess
    | GetProjectConfiguration
    | GetContractorsSuccess
    | GetProject
    | CreateProjectSuccess
    | CreateProject
    | GetProjectSuccess
    | GetProjects
    | GetProjectsSuccess
    | UpdateProjectSuccess
    | UpdateProject
    ;

