import { IAppState } from './../models/base.model';
import { InitStateGroup } from '../models/group.model';
import { IActions } from './../../@share/models/action.model';
import { GET_GROUP_SUCCESS } from './../actions/group.action';
import { createSelector } from '@ngrx/store';

const initialSate: InitStateGroup = {
    groupData: {
        success: false,
        docs: [],
        totalDocs: 0,
        page: 1,
        limit: 10
    }
}

export function groupReducer(state: InitStateGroup = initialSate, action: IActions) {
    switch (action.type) {
        case GET_GROUP_SUCCESS: {
            return {
                ...state,
                groupData: { ...action.payload }
            }
        }
        default: {
            return { ...state }
        }
    }
}

const createSelectorGroup = (state: IAppState) => state.group;

export const groupSelector = {
    selectGroupData: createSelector(createSelectorGroup, (state: InitStateGroup) => state?.groupData),
}