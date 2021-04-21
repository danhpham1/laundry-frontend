import { IGetLaundryResponse, IPostLaundryResponse } from "../../@share/models/laundry.model";

export interface InitStateLaundry {
    laundryData: IGetLaundryResponse,
    laundryPost: IPostLaundryResponse,
    laundryPatch: IPostLaundryResponse,
    laundryDelete: IPostLaundryResponse,
    error:any
}