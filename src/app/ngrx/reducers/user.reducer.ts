import { InitStateUser } from './../models/user.model';
import { IAppState } from './../models/base.model';
import { IActions } from './../../@share/models/action.model';
import { createSelector } from '@ngrx/store';
import { TypeName } from '../actions/user.action';


const initialState: InitStateUser = {
    registerUserResponse:{
        success:false,
        results:{
            _id:'',
            address:'',
            email:'',
            name:'',
            phone:'',
            username:''
        }
    },
    registerUserError:{
        success:true,
        error:{}
    }
}

export function userReducer(state: InitStateUser = initialState, action: IActions) {
    switch (action.type) {
        case TypeName.REGISTER_USER_REQUEST_SUCCESS:
            return {
                ...state,
                ...clearState()
            }
        case TypeName.REGISTER_USER_REQUEST_SUCCESS:
            return {
                ...state,
                registerUserResponse:{
                    ...action.payload
                }
            }
        case TypeName.REGISTER_USER_REQUEST_FAILED:
            return {
                ...state,
                registerUserError: {
                    ...action.payload
                }
            }
        default:
            return {
               ...state
            }
    }
}

const createSelectorUser = (state: IAppState) => state.user;
export const userSelector = {
    selectRegisterUserResponse: createSelector(createSelectorUser, (state: InitStateUser) => state?.registerUserResponse),
    selectRegisterUserError: createSelector(createSelectorUser, (state: InitStateUser) => state?.registerUserError),
}
function clearError() {
    return undefined;
}

function clearState() {
    return {
        registerUserResponse: {
            success: false,
            results: {
                _id: '',
                address: '',
                email: '',
                name: '',
                phone: '',
                username: ''
            }
        },
        registerUserError: {
            success: true,
            error: {}
        }
    }
}