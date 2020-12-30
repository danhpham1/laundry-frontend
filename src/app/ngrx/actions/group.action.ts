import { IPageOptions } from './../../@share/models/action.model';
import { Action } from "@ngrx/store";

export const GET_GROUP_REQUEST = 'GET_GROUP_REQUEST';
export const GET_GROUP_SUCCESS = 'GET_GROUP_SUCCESS';
export const GET_GROUP_FAILED = 'GET_GROUP_FAILED';

export const CREATE_GROUP_REQUEST = 'CREATE_GROUP_REQUEST';
export const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS';
export const CREATE_GROUP_FAILED = 'CREATE_GROUP_FAILED';

export class getGroupRequest implements Action {
    readonly type: string = GET_GROUP_REQUEST;
    constructor(public payload?: IPageOptions) {
    }
}

export class getGroupSuccess implements Action {
    readonly type: string = GET_GROUP_SUCCESS;
    constructor(public payload: any) {
    }
}

export class getGroupFailed implements Action {
    readonly type: string = GET_GROUP_FAILED;
    constructor(public payload?: any) {
    }
}


export class createGroupRequest implements Action {
    readonly type: string = CREATE_GROUP_REQUEST;
    constructor(public payload?: any) {
    }
}

export class createGroupSuccess implements Action {
    readonly type: string = CREATE_GROUP_SUCCESS;
    constructor(public payload?: any) {
    }
}

export class createGroupFailed implements Action {
    readonly type: string = CREATE_GROUP_FAILED;
    constructor(public payload?: any) {
    }
}


export type GroupActions =
    getGroupRequest |
    getGroupSuccess |
    getGroupFailed |
    createGroupRequest |
    createGroupSuccess |
    createGroupFailed;