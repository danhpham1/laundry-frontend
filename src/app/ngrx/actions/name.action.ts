import { IPostName, IUpdateName, IDeleteName } from './../../@share/models/name.model';
import { IPageOptions } from './../../@share/models/action.model';
import { Action } from "@ngrx/store";
import { deleteGroupFailed, deleteGroupRequest, deleteGroupSuccess, updateGroupFailed, updateGroupRequest, updateGroupSuccess } from './group.action';

export const enum TypeName {
    GET_NAME_REQUEST = 'GET_NAME_REQUEST',
    GET_NAME_SUCCESS = 'GET_NAME_SUCCESS',
    GET_NAME_FAILED = 'GET_NAME_FAILED',

    CREATE_NAME_REQUEST = 'CREATE_NAME_REQUEST',
    CREATE_NAME_REQUEST_SUCCESS = 'CREATE_NAME_REQUEST_SUCCESS',
    CREATE_NAME_REQUEST_FAILED = 'CREATE_NAME_REQUEST_FAILED',

    UPDATE_NAME_REQUEST = 'UPDATE_NAME_REQUEST',
    UPDATE_NAME_REQUEST_SUCCESS = 'UPDATE_NAME_REQUEST_SUCCESS',
    UPDATE_NAME_REQUEST_FAILED = 'UPDATE_NAME_REQUEST_FAILED',

    DELETE_NAME_REQUEST = 'DELETE_NAME_REQUEST',
    DELETE_NAME_REQUEST_SUCCESS = 'DELETE_NAME_REQUEST_SUCCESS',
    DELETE_NAME_REQUEST_FAILED = 'DELETE_NAME_REQUEST_FAILED',

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

export class updateNameRequest implements Action {
    readonly type: string = TypeName.UPDATE_NAME_REQUEST;
    constructor(public payload: IUpdateName) { }
}

export class updateNameSuccess implements Action {
    readonly type: string = TypeName.UPDATE_NAME_REQUEST_SUCCESS;
    constructor(public payload?: any) { }
}

export class updateNameFailed implements Action {
    readonly type: string = TypeName.UPDATE_NAME_REQUEST_FAILED;
    constructor(public payload?: any) { }
}

export class deleteNameRequest implements Action {
    readonly type: string = TypeName.DELETE_NAME_REQUEST;
    constructor(public payload: IDeleteName) { }
}

export class deleteNameSuccess implements Action {
    readonly type: string = TypeName.DELETE_NAME_REQUEST_SUCCESS;
    constructor(public payload?: any) { }
}

export class deleteNameFailed implements Action {
    readonly type: string = TypeName.DELETE_NAME_REQUEST_FAILED;
    constructor(public payload?: any) { }
}

export type NameActions =
    getNameRequest |
    getNameSuccess |
    getNameFailed |
    postNameRequest |
    postNameSuccess |
    postNameFailed |
    updateGroupRequest |
    updateGroupSuccess |
    updateGroupFailed |
    deleteGroupRequest |
    deleteGroupSuccess |
    deleteGroupFailed
    ;