import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';


import { LaundryService } from './../../@main/services/laundry.service';
import { IGetLaundryResponse } from './../../@share/models/laundry.model';
import { IActions } from './../../@share/models/action.model';
import * as laundryActions from './../actions/laundry.action';




@Injectable()
export class LaundryEffects {
    @Effect() getLaundry: Observable<Action> = this.actions$.pipe(
        ofType<laundryActions.getLaundryRequest>(laundryActions.TypeName.GET_LAUNDRY_REQUEST),
        map((action: IActions) => action?.payload),
        switchMap((payload) => {
            return this.laundryService.getLaundry(payload).pipe(
                switchMap((groupResponse: IGetLaundryResponse) => {
                    return of(new laundryActions.getLaundrySuccess(groupResponse))
                }),
                catchError((error: any) => {
                    return of(new laundryActions.getLaundryFailed(error));
                })
            )
        })
    )

    constructor(
        private actions$: Actions,
        private laundryService: LaundryService
    ) { }
}