import { IAppState } from './../models/base.model';
import { InitStateLaundry } from './../models/laundry.model';
import { IActions } from './../../@share/models/action.model';
import { createSelector } from '@ngrx/store';
import * as laundryActions from '../actions/laundry.action';

const initialSate: InitStateLaundry = {
    laundryData:{
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
    error:undefined
}

export function laundryReducer(state: InitStateLaundry = initialSate, action: IActions) {
    switch (action.type) {
        case laundryActions.TypeName.GET_LAUNDRY_REQUEST:
            return {
                ...state,
                laundryData: {
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
        
        case laundryActions.TypeName.GET_LAUNDRY_SUCCESS:
            return{
                ...state,
                laundryData:action.payload
            }
        case laundryActions.TypeName.GET_LAUNDRY_FAILED:
            return{
                ...state,
                error:action.payload
            }            
        default:
            return {
                ...state,
                laundryData: {
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
                error:clearError()
            }; 
    }
}

const createLaudryGroup = (state: IAppState) => state.laundry;

export const laundrySelector = {
    selectLaundryData: createSelector(createLaudryGroup, (state: InitStateLaundry) => state?.laundryData),
    selectError: createSelector(createLaudryGroup, (state: InitStateLaundry) => state?.error)
}


function clearError(){
    return undefined;
}