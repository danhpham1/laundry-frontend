export interface IActions {
    type: string,
    payload?: any
}

export interface IPageOptions {
    currentPage: number | undefined,
    limit: number | undefined
}