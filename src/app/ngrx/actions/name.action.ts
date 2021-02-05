import { IPostName } from './../../@share/models/name.model';
import { IPageOptions } from './../../@share/models/action.model';
import { Action } from "@ngrx/store";

export const enum TypeName {
    GET_NAME_REQUEST = 'GET_NAME_REQUEST',
    GET_NAME_SUCCESS = 'GET_NAME_SUCCESS',
    GET_NAME_FAILED = 'GET_NAME_FAILED',

    CREATE_NAME_REQUEST = 'CREATE_NAME_REQUEST',
    CREATE_NAME_REQUEST_SUCCESS = 'CREATE_NAME_REQUEST_SUCCESS',
    CREATE_NAME_REQUEST_FAILED = 'CREATE_NAME_REQUEST_FAILED',

}

export class getNameRequest implements Action {
    readonly type: string = TypeName.GET_NAME_REQUEST;
    constructor(public payload?: IPageOptions) { }
}

export class getNameSuccess implements Action {
    readonly type: string = TypeName.GET_NAME_SUCCESS;
    constructor(public payload?: any) { }
}

export class getNameFailed implements Action {
    readonly type: string = TypeName.GET_NAME_FAILED;
    constructor(public payload?: any) { }
}

export class postNameRequest implements Action {
    readonly type: string = TypeName.CREATE_NAME_REQUEST;
    constructor(public payload: IPostName) { }
}

export class postNameSuccess implements Action {
    readonly type: string = TypeName.CREATE_NAME_REQUEST_SUCCESS;
    constructor(public payload?: any) { }
}

export class postNameFailed implements Action {
    readonly type: string = TypeName.CREATE_NAME_REQUEST_FAILED;
    constructor(public payload?: any) { }
}

export type NameActions =
    getNameRequest |
    getNameSuccess |
    getNameFailed |
    postNameRequest |
    postNameSuccess |
    postNameFailed
    ;