import { IPageOptions } from './../../@share/models/action.model';
import { Action } from "@ngrx/store";

export const enum TypeName {
    REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST',
    REGISTER_USER_REQUEST_SUCCESS = 'REGISTER_USER_REQUEST_SUCCESS',
    REGISTER_USER_REQUEST_FAILED = 'REGISTER_USER_REQUEST_FAILED'
}

export class registerUserRequest implements Action {
    readonly type: string = TypeName.REGISTER_USER_REQUEST;
    constructor(public payload?: any) {
    }
}

export class registerUserSuccess implements Action {
    readonly type: string = TypeName.REGISTER_USER_REQUEST_SUCCESS;
    constructor(public payload?: any) {
    }
}

export class registerUserFailed implements Action {
    readonly type: string = TypeName.REGISTER_USER_REQUEST_FAILED;
    constructor(public payload?: any) {
    }
}


export type UserActions =
    registerUserRequest |
    registerUserSuccess |
    registerUserFailed 
;