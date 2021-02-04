import { IPageOptions } from './../../@share/models/action.model';
import { Action } from "@ngrx/store";

export const enum TypeName {
    GET_NAME_REQUEST = 'GET_NAME_REQUEST',
    GET_NAME_SUCCESS = 'GET_NAME_SUCCESS',
    GET_NAME_FAILED = 'GET_NAME_FAILED'
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

export type NameActions =
    getNameRequest |
    getNameSuccess |
    getNameFailed;