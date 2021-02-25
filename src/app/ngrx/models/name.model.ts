import { IGetNameResponse, ICreateNameResponse, IUpdateNameResponse, IDeleteNameResponse } from './../../@share/models/name.model';
export interface InitStateName {
    nameResponse: IGetNameResponse,
    isCreateName:ICreateNameResponse,
    isUpdateName:IUpdateNameResponse,
    isDeleteName:IDeleteNameResponse,
    error: any
}