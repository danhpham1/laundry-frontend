import { IRegisterFailedResponse, IRegisterResponse } from "../../@auth/models/register";

export interface InitStateUser {
    registerUserResponse: IRegisterResponse,
    registerUserError: IRegisterFailedResponse
}