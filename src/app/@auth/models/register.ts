export interface IRegisterBody{
    username:string;
    password:string;
    name:string;
    email:string;
}

export interface IRegisterFailedResponse{
    success:boolean;
    error:any
}

export interface IRegisterResponse {
    success: boolean;
    results: {
        _id: string,
        username: string,
        name: string,
        email: string,
        phone: string,
        address: string
    }
}