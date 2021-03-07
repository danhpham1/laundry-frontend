import { IPageOptions } from './../../@share/models/action.model';
import { Action } from "@ngrx/store";

export const enum TypeName {
    GET_LAUNDRY_REQUEST = 'GET_LAUNDRY_REQUEST',
    GET_LAUNDRY_SUCCESS = 'GET_LAUNDRY_SUCCESS',
    GET_LAUNDRY_FAILED = 'GET_LAUNDRY_FAILED',

    // CREATE_NAME_REQUEST = 'CREATE_NAME_REQUEST',
    // CREATE_NAME_REQUEST_SUCCESS = 'CREATE_NAME_REQUEST_SUCCESS',
    // CREATE_NAME_REQUEST_FAILED = 'CREATE_NAME_REQUEST_FAILED',

    // UPDATE_NAME_REQUEST = 'UPDATE_NAME_REQUEST',
    // UPDATE_NAME_REQUEST_SUCCESS = 'UPDATE_NAME_REQUEST_SUCCESS',
    // UPDATE_NAME_REQUEST_FAILED = 'UPDATE_NAME_REQUEST_FAILED',

    // DELETE_NAME_REQUEST = 'DELETE_NAME_REQUEST',
    // DELETE_NAME_REQUEST_SUCCESS = 'DELETE_NAME_REQUEST_SUCCESS',
    // DELETE_NAME_REQUEST_FAILED = 'DELETE_NAME_REQUEST_FAILED',

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


export type NameActions =
    getLaundryRequest |
    getLaundrySuccess |
    getLaundryFailed 
    ;