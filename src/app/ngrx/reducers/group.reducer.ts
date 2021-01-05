import { IAppState } from './../models/base.model';
import { InitStateGroup } from '../models/group.model';
import { IActions } from './../../@share/models/action.model';
import { CREATE_GROUP_SUCCESS, GET_GROUP_FAILED, GET_GROUP_SUCCESS, CREATE_GROUP_FAILED, GET_GROUP_REQUEST, CREATE_GROUP_REQUEST, UPDATE_GROUP_SUCCESS, UPDATE_GROUP_FAILED, UPDATE_GROUP_REQUEST, DELETE_GROUP_REQUEST, DELETE_GROUP_SUCCESS, DELETE_GROUP_FAILED } from './../actions/group.action';
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
    isUpdate: undefined,
    isDelete: undefined,
    error: undefined
}

export function groupReducer(state: InitStateGroup = initialSate, action: IActions) {
    // console.log(action.payload);
    switch (action.type) {
        case GET_GROUP_REQUEST: {
            return {
                ...state,
                isCreateFailed: clearIsCreateGroupFailed(),
                isUpdate: undefined,
                isDelete: undefined,
                error: clearError(),
            }
        }
        case GET_GROUP_SUCCESS: {
            return {
                ...state,
                groupData: { ...action.payload },
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
                groupCreateResponse: {
                    success: false,
                    results: {}
                },
                isCreateFailed: clearIsCreateGroupFailed(),
                isUpdate: undefined,
                isDelete: undefined,
                error: clearError(),
            }
        }
        case CREATE_GROUP_SUCCESS: {
            return {
                ...state,
                groupCreateResponse: {
                    ...action.payload
                },
            }
        }
        case CREATE_GROUP_FAILED: {
            return {
                ...state,
                isCreateFailed: action.payload,
            }
        }
        case UPDATE_GROUP_REQUEST: {
            return {
                ...state,
                isCreateFailed: clearIsCreateGroupFailed(),
                isUpdate: undefined,
                isDelete: undefined,
                error: clearError(),
            }
        }
        case UPDATE_GROUP_SUCCESS: {
            return {
                ...state,
                isUpdate: action.payload,
            }
        }
        case UPDATE_GROUP_FAILED: {
            return {
                ...state,
                isUpdate: action.payload
            }
        }
        case DELETE_GROUP_REQUEST: {
            return {
                ...state,
                isCreateFailed: clearIsCreateGroupFailed(),
                isUpdateSuccess: undefined,
                isDelete: undefined,
                error: clearError(),

            }
        }
        case DELETE_GROUP_SUCCESS: {
            return {
                ...state,
                isDelete: action.payload
            }
        }
        case DELETE_GROUP_FAILED: {
            return {
                ...state,
                isDelete: action.payload
            }
        }
        default: {
            return {
                ...state,
                error: clearError(),
                isCreateFailed: clearIsCreateGroupFailed(),
                isUpdateSuccess: undefined,
                isDelete: undefined
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
    selectUpdateGroupResponse: createSelector(createSelectorGroup, (state: InitStateGroup) => state?.isUpdate),
    selectDelteGroupResponse: createSelector(createSelectorGroup, (state: InitStateGroup) => state?.isDelete)
}

function clearError() {
    return undefined;
}

function clearIsCreateGroupFailed() {
    return undefined;
}