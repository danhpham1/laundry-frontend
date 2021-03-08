import { IGetLaundryResponse, IPostLaundryResponse } from "../../@share/models/laundry.model";

export interface InitStateLaundry {
    laundryData: IGetLaundryResponse,
    laundryPost: IPostLaundryResponse,
    error:any
}