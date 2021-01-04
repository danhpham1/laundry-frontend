import { IAppState } from './../models/base.model';
import { InitStateGroup } from '../models/group.model';
import { IActions } from './../../@share/models/action.model';
import { CREATE_GROUP_SUCCESS, GET_GROUP_FAILED, GET_GROUP_SUCCESS, CREATE_GROUP_FAILED, GET_GROUP_REQUEST, CREATE_GROUP_REQUEST, UPDATE_GROUP_SUCCESS, UPDATE_GROUP_FAILED } from './../actions/group.action';
import { createSelector } from '@ngrx/store';

const initialSate: InitStateGroup = {
    groupData: {
        success: false,
        docs: [],
        totalDocs: 0,
        page: 1,
        limit: 10
    },
    groupCreateResponse: {
        success: false,
        results: {}
    },
    isCreateFailed: false,
    isUpdateSuccess: false,
    error: undefined
}

export function groupReducer(state: InitStateGroup = initialSate, action: IActions) {
    switch (action.type) {
        case GET_GROUP_REQUEST: {
            return {
                ...state,
                error: clearError()
            }
        }
        case GET_GROUP_SUCCESS: {
            return {
                ...state,
                groupData: { ...action.payload },
                error: clearError()
            }
        }
        case GET_GROUP_FAILED: {
            return {
                ...state,
                error: action.payload
            }
        }
        case CREATE_GROUP_REQUEST: {
            return {
                ...state,
                groupData: { ...action.payload },
                groupCreateResponse: {
                    success: false,
                    results: {}
                },
                isCreateFailed: clearIsCreateGroupFailed(),
                error: clearError()
            }
        }
        case CREATE_GROUP_SUCCESS: {
            return {
                ...state,
                groupCreateResponse: {
                    ...action.payload
                },
                isCreateFailed: clearIsCreateGroupFailed(),
                error: clearError()
            }
        }
        case CREATE_GROUP_FAILED: {
            return {
                ...state,
                isCreateFailed: action.payload,
                error: clearError(),
            }
        }
        case UPDATE_GROUP_SUCCESS: {
            return {
                ...state,
                isCreateFailed: clearIsCreateGroupFailed(),
                error: clearError(),
                isUpdateSuccess: action.payload
            }
        }
        case UPDATE_GROUP_FAILED: {
            return {
                ...state,
                isCreateFailed: clearIsCreateGroupFailed(),
                error: clearError(),
                isUpdateSuccess: action.payload
            }
        }
        default: {
            return {
                ...state,
                error: clearError(),
                isCreateFailed: clearIsCreateGroupFailed(),
                isUpdateSuccess: false
            }
        }
    }
}

const createSelectorGroup = (state: IAppState) => state.group;

export const groupSelector = {
    selectGroupData: createSelector(createSelectorGroup, (state: InitStateGroup) => state?.groupData),
    selectCreateGroupResponse: createSelector(createSelectorGroup, (state: InitStateGroup) => state?.groupCreateResponse),
    selectGroupFailed: createSelector(createSelectorGroup, (state: InitStateGroup) => state?.error),
    selectCreateGroupFailedResponse: createSelector(createSelectorGroup, (state: InitStateGroup) => state?.isCreateFailed),
    selectUpdateGroupResponse: createSelector(createSelectorGroup, (state: InitStateGroup) => state?.isUpdateSuccess)
}

function clearError() {
    return undefined;
}

function clearIsCreateGroupFailed() {
    return undefined;
}