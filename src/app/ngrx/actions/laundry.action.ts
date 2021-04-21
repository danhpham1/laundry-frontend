import { IPostLaundry, IPatchLaundry, IDeleteLaundry } from './../../@share/models/laundry.model';
import { IPageOptions } from './../../@share/models/action.model';
import { Action } from "@ngrx/store";
import { deleteNameFailed, deleteNameRequest, deleteNameSuccess } from './name.action';

export const enum TypeName {
    GET_LAUNDRY_REQUEST = 'GET_LAUNDRY_REQUEST',
    GET_LAUNDRY_SUCCESS = 'GET_LAUNDRY_SUCCESS',
    GET_LAUNDRY_FAILED = 'GET_LAUNDRY_FAILED',

    CREATE_LAUNDRY_REQUEST = 'CREATE_LAUNDRY_REQUEST',
    CREATE_LAUNDRY_REQUEST_SUCCESS = 'CREATE_LAUNDRY_REQUEST_SUCCESS',
    CREATE_LAUNDRY_REQUEST_FAILED = 'CREATE_LAUNDRY_REQUEST_FAILED',

    UPDATE_LAUNDRY_REQUEST = 'UPDATE_LAUNDRY_REQUEST',
    UPDATE_LAUNDRY_REQUEST_SUCCESS = 'UPDATE_LAUNDRY_REQUEST_SUCCESS',
    UPDATE_LAUNDRY_REQUEST_FAILED = 'UPDATE_LAUNDRY_REQUEST_FAILED',

    DELETE_LAUNDRY_REQUEST = 'DELETE_LAUNDRY_REQUEST',
    DELETE_LAUNDRY_REQUEST_SUCCESS = 'DELETE_LAUNDRY_REQUEST_SUCCESS',
    DELETE_LAUNDRY_REQUEST_FAILED = 'DELETE_LAUNDRY_REQUEST_FAILED',

}

export class getLaundryRequest implements Action {
    readonly type: string = TypeName.GET_LAUNDRY_REQUEST;
    constructor(public payload?: IPageOptions) { }
}

export class getLaundrySuccess implements Action {
    readonly type: string = TypeName.GET_LAUNDRY_SUCCESS;
    constructor(public payload?: any) { }
}

export class getLaundryFailed implements Action {
    readonly type: string = TypeName.GET_LAUNDRY_FAILED;
    constructor(public payload?: any) { }
}

export class postLaundryRequest implements Action {
    readonly type: string = TypeName.CREATE_LAUNDRY_REQUEST;
    constructor(public payload: IPostLaundry) { }
}

export class postLaundrySuccess implements Action {
    readonly type: string = TypeName.CREATE_LAUNDRY_REQUEST_SUCCESS;
    constructor(public payload?: any) { }
}

export class postLaundryFailed implements Action {
    readonly type: string = TypeName.CREATE_LAUNDRY_REQUEST_FAILED;
    constructor(public payload?: any) { }
}

export class patchLaundryRequest implements Action {
    readonly type: string = TypeName.UPDATE_LAUNDRY_REQUEST;
    constructor(public payload: IPatchLaundry) { }
}

export class patchLaundrySuccess implements Action {
    readonly type: string = TypeName.UPDATE_LAUNDRY_REQUEST_SUCCESS;
    constructor(public payload?: any) { }
}

export class patchLaundryFailed implements Action {
    readonly type: string = TypeName.UPDATE_LAUNDRY_REQUEST_FAILED;
    constructor(public payload?: any) { }
}

export class deleteLaundryRequest implements Action {
    readonly type: string = TypeName.DELETE_LAUNDRY_REQUEST;
    constructor(public payload: IDeleteLaundry) { }
}

export class deleteLaundrySuccess implements Action {
    readonly type: string = TypeName.DELETE_LAUNDRY_REQUEST_SUCCESS;
    constructor(public payload?: any) { }
}

export class deleteLaundryFailed implements Action {
    readonly type: string = TypeName.DELETE_LAUNDRY_REQUEST_FAILED;
    constructor(public payload?: any) { }
}

export type NameActions =
    getLaundryRequest |
    getLaundrySuccess |
    getLaundryFailed |
    postLaundryRequest |
    postLaundrySuccess|
    postLaundryFailed |
    deleteNameRequest |
    deleteNameSuccess |
    deleteNameFailed
    ;