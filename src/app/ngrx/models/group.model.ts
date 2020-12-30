import { IGroupModelGet, ICreateGroupResponse } from "./../../@share/models/group.model";

export interface InitStateGroup {
    groupData: IGroupModelGet;
    groupCreateResponse: ICreateGroupResponse
    error: any
}