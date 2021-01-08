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
