export interface ILaundry{
    _id:string,
    username:string,
    name:string,
    createAt:Date,
    updateAt:Date,
    weight:number,
    price:number,
    group:string,
    total:number
}

export interface IPostLaundry{
    group:string,
    name:string,
    weight:number,
    price:number,
    total:number
}

export interface IGetLaundryResponse{
    success: boolean,
    docs: Array<ILaundry> | [],
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

export interface IPostLaundryResponse{
    success:boolean,
    message:string,
    error?:any
}