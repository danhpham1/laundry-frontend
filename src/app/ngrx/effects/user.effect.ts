import { IRegisterFailedResponse, IRegisterResponse } from './../../@auth/models/register';
import { UserService } from './../../@auth/services/user.service';
import { IActions } from './../../@share/models/action.model';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import * as UserActions from './../actions/user.action';

@Injectable()
export class UserEffects {
    @Effect() postUser: Observable<Action> = this.actions$.pipe(
        ofType<UserActions.registerUserRequest>(UserActions.TypeName.REGISTER_USER_REQUEST),
        map((action: IActions) => action?.payload),
        switchMap((payload) => {
            return this.userService.registerUser({...payload}).pipe(
                switchMap((registerUserResponse: IRegisterResponse) => {
                    return of(new UserActions.registerUserSuccess(registerUserResponse))
                }),
                catchError((error: IRegisterFailedResponse) => {
                    return of(new UserActions.registerUserFailed(error));
                })
            )
        })
    )
    constructor(
        private actions$: Actions,
        private userService:UserService
    ) { }
}