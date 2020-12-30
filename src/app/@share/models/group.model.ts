import { NzTableSortFn } from "ng-zorro-antd/table";

export interface GroupModel {
    _id: string,
    createAt: Date,
    updateAt: Date,
    isHide: boolean,
    idNameLaundryArray: Array<any>
    name: string,
}

export interface ColumnNameModel {
    sortFn: NzTableSortFn | null
}

export interface GroupModelCreate {
    name: string,
}

export interface ICreateGroupBody {
    name: string,
}

export interface IGroupModelGet {
    success: boolean,
    docs: Array<GroupModel> | [],
    totalDocs: number,
    limit: number,
    page: number,
    totalPages?: number,
    pagingCounter?: number,
    hasPrevPage?: boolean,
    hasNextPage?: boolean,
    prevPage?: boolean,
    nextPage?: boolean,
}

export interface ICreateGroupResponse {
    success: boolean,
    results: GroupModel | {}
}

