import { InitStateName } from './../models/name.model';
import { IAppState } from './../models/base.model';
import { IActions } from './../../@share/models/action.model';
import { createSelector } from '@ngrx/store';
import { TypeName } from '../actions/name.action';


const initialState: InitStateName = {
    nameResponse: {
        success: false,
        docs: [],
        totalDocs: 0,
        limit: 10,
        page: 1,
        totalPages: 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null
    },
    error: undefined
}

export function nameReducer(state: InitStateName = initialState, action: IActions) {
    switch (action.type) {
        case TypeName.GET_NAME_REQUEST:
            return {
                ...state,
                nameResponse: {
                    success: false,
                    docs: [],
                    totalDocs: 0,
                    limit: 10,
                    page: 1,
                    totalPages: 1,
                    pagingCounter: 1,
                    hasPrevPage: false,
                    hasNextPage: false,
                    prevPage: null,
                    nextPage: null
                },
                error: clearError()
            }
        case TypeName.GET_NAME_SUCCESS:
            return {
                ...state,
                nameResponse: {
                    ...action.payload
                }
            }
        case TypeName.GET_NAME_FAILED:
            return {
                ...state,
                error: {
                    ...action.payload
                }
            }
        default:
            return {
                ...state,
                error: clearError()
            }
    }
}

const createSelectorName = (state: IAppState) => state.name;
export const nameSelector = {
    selectNameResponse: createSelector(createSelectorName, (state: InitStateName) => state?.nameResponse),
    selectNameError: createSelector(createSelectorName, (state: InitStateName) => state?.error)
}
function clearError() {
    return undefined;
}