import { IGroupModelGet, ICreateGroupResponse } from "./../../@share/models/group.model";

export interface InitStateGroup {
    groupData: IGroupModelGet;
    groupCreateResponse: ICreateGroupResponse,
    isCreateFailed: boolean | undefined,
    isUpdate: boolean | undefined,
    isDelete: boolean | undefined,
    error: any
}