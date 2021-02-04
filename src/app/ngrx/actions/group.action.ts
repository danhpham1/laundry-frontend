import { IPageOptions } from './../../@share/models/action.model';
import { Action } from "@ngrx/store";

export const GET_GROUP_REQUEST = 'GET_GROUP_REQUEST';
export const GET_GROUP_SUCCESS = 'GET_GROUP_SUCCESS';
export const GET_GROUP_FAILED = 'GET_GROUP_FAILED';

export const GET_GROUP_ALL_REQUEST = 'GET_GROUP_ALL_REQUEST';
export const GET_GROUP_ALL_SUCCESS = 'GET_GROUP_ALL_SUCCESS';
export const GET_GROUP_ALL_FAILED = 'GET_GROUP_ALL_FAILED';

export const CREATE_GROUP_REQUEST = 'CREATE_GROUP_REQUEST';
export const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS';
export const CREATE_GROUP_FAILED = 'CREATE_GROUP_FAILED';

export const UPDATE_GROUP_REQUEST = 'UPDATE_GROUP_REQUEST';
export const UPDATE_GROUP_SUCCESS = 'UPDATE_GROUP_SUCCESS';
export const UPDATE_GROUP_FAILED = 'UPDATE_GROUP_FAILED';

export const DELETE_GROUP_REQUEST = 'DELETE_GROUP_REQUEST';
export const DELETE_GROUP_SUCCESS = 'DELETE_GROUP_SUCCESS';
export const DELETE_GROUP_FAILED = 'DELETE_GROUP_FAILED';

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

export class getAllGroupRequest implements Action {
    readonly type: string = GET_GROUP_ALL_REQUEST;
    constructor(public payload?:any) {
    }
}

export class getAllGroupSuccess implements Action {
    readonly type: string = GET_GROUP_ALL_SUCCESS;
    constructor(public payload: any) {
    }
}

export class getAllGroupFailed implements Action {
    readonly type: string = GET_GROUP_ALL_FAILED;
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

export class updateGroupRequest implements Action {
    readonly type: string = UPDATE_GROUP_REQUEST;
    constructor(public payload?: any) {
    }
}

export class updateGroupSuccess implements Action {
    readonly type: string = UPDATE_GROUP_SUCCESS;
    constructor(public payload?: any) {
    }
}

export class updateGroupFailed implements Action {
    readonly type: string = UPDATE_GROUP_FAILED;
    constructor(public payload?: any) {
    }
}

export class deleteGroupRequest implements Action {
    readonly type: string = DELETE_GROUP_REQUEST;
    constructor(public payload?: any) {
    }
}

export class deleteGroupSuccess implements Action {
    readonly type: string = DELETE_GROUP_SUCCESS;
    constructor(public payload?: any) {
    }
}

export class deleteGroupFailed implements Action {
    readonly type: string = DELETE_GROUP_FAILED;
    constructor(public payload?: any) {
    }
}



export type GroupActions =
    getGroupRequest |
    getGroupSuccess |
    getGroupFailed |
    getAllGroupRequest |
    getAllGroupSuccess |
    getAllGroupFailed |
    createGroupRequest |
    createGroupSuccess |
    createGroupFailed |
    updateGroupRequest |
    updateGroupSuccess |
    updateGroupFailed |
    deleteGroupRequest |
    deleteGroupSuccess |
    deleteGroupFailed
    ;