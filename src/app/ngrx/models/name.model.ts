import { IGetNameResponse, ICreateNameResponse } from './../../@share/models/name.model';
export interface InitStateName {
    nameResponse: IGetNameResponse,
    isCreateName:ICreateNameResponse,
    error: any
}