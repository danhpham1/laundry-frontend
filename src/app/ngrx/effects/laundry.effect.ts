import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';


import { LaundryService } from './../../@main/services/laundry.service';
import { IGetLaundryResponse, IPostLaundryResponse } from './../../@share/models/laundry.model';
import { IActions } from './../../@share/models/action.model';
import * as laundryActions from './../actions/laundry.action';




@Injectable()
export class LaundryEffects {
    @Effect() getLaundry: Observable<Action> = this.actions$.pipe(
        ofType<laundryActions.getLaundryRequest>(laundryActions.TypeName.GET_LAUNDRY_REQUEST),
        map((action: IActions) => action?.payload),
        switchMap((payload) => {
            return this.laundryService.getLaundry(payload).pipe(
                switchMap((laundryResponse: IGetLaundryResponse) => {
                    return of(new laundryActions.getLaundrySuccess(laundryResponse))
                }),
                catchError((error: any) => {
                    return of(new laundryActions.getLaundryFailed(error));
                })
            )
        })
    )

    @Effect() postLaundry: Observable<Action> = this.actions$.pipe(
        ofType<laundryActions.postLaundryRequest>(laundryActions.TypeName.CREATE_LAUNDRY_REQUEST),
        map((action: IActions) => action?.payload),
        switchMap((payload) => {
            return this.laundryService.postLaundry({...payload}).pipe(
                switchMap((postLaundryResponse: IPostLaundryResponse) => {
                    return of(new laundryActions.postLaundrySuccess(postLaundryResponse))
                }),
                catchError((error: any) => {
                    return of(new laundryActions.postLaundryFailed(error));
                })
            )
        })
    )

    constructor(
        private actions$: Actions,
        private laundryService: LaundryService
    ) { }
}