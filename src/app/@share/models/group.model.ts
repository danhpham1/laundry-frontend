import { NzTableSortFn } from "ng-zorro-antd/table";

export interface GroupModel {
    _id: string,
    name: string,
    createAt?: Date
}

export interface ColumnNameModel {
    sortFn: NzTableSortFn | null
}