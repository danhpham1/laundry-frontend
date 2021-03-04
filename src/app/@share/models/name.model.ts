import { IGroupInfo } from "./group.model";

export interface INameModel {
    _id: string,
    createAt: Date,
    updateAt: Date,
    isHide: boolean,
    name: string,
    idGroup: string,
    price: number,
    groupInfo: Array<IGroupInfo>
}


export interface IGetNameResponse {
    success: boolean,
    docs: Array<INameModel> | [],
    totalDocs: number,
    limit: number,
    page: number,
    totalPages: number,
    pagingCounter: number,
    hasPrevPage: boolean,
    hasNextPage: boolean,
    prevPage: null,
    nextPage: null
}

export interface ICreateNameResponse {
    success:boolean,
    results:ICreateName | {},
    error?:any
}


interface ICreateName{
    creatAt:Date,
    updateAt:Date,
    isHide:boolean,
    _id:string,
    name:string,
    idGroup:string,
    price:number
}
export interface IUpdateNameResponse {
    success:boolean,
    results: ICreateName | {},
    error?: any
}

export interface IPostName{
    name:string,
    idGroup:string,
    price:number,
    isHide?:boolean
}

export interface IUpdateName{
    idName:string,
    body:{
        name?: string,
        idGroup?: string,
        price?: number
    }
}

export interface IDeleteNameResponse{
    success:boolean,
    message:string,
    error?:any
}
export interface IDeleteName{
    idName:string,
    idGroup:string
}


export interface INameOfGroup{
    _id: string,
    createAt: Date,
    updateAt: Date,
    isHide: boolean,
    name: string,
    idGroup: string,
    price: number,
}