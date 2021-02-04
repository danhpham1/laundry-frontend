import { IGroupModelGet, ICreateGroupResponse, IGetAllGroups } from "./../../@share/models/group.model";

export interface InitStateGroup {
    groupData: IGroupModelGet;
    groupCreateResponse: ICreateGroupResponse,
    allGroups:IGetAllGroups,
    isCreateFailed: boolean | undefined,
    isUpdate: boolean | undefined,
    isDelete: boolean | undefined,
    error: any
}