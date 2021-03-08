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
    laundryPost:{
        success:false,
        message:'',
        error:undefined
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
        case laundryActions.TypeName.CREATE_LAUNDRY_REQUEST:
            return{
                ...state,
                laundryPost:clearStatePostLaundry()
            }
        case laundryActions.TypeName.CREATE_LAUNDRY_REQUEST_SUCCESS:
            return{
                ...state,
                laundryPost:action.payload
            }
        case laundryActions.TypeName.CREATE_LAUNDRY_REQUEST_FAILED:
            return{
                ...state,
                laundryPost:action.payload
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
                laundryPost:clearStatePostLaundry(),
                error:clearError()
            }; 
    }
}

const createLaudryGroup = (state: IAppState) => state.laundry;

export const laundrySelector = {
    selectLaundryData: createSelector(createLaudryGroup, (state: InitStateLaundry) => state?.laundryData),
    selectLaundryPost: createSelector(createLaudryGroup, (state: InitStateLaundry) => state?.laundryPost),
    selectError: createSelector(createLaudryGroup, (state: InitStateLaundry) => state?.error)
}


function clearError(){
    return undefined;
}

function clearStatePostLaundry(){
    return {
        success: false,
        message: '',
        error: undefined
    }
}