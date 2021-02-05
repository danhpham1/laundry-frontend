import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';

import { NameService } from './../../@main/services/name.service';
import { IActions } from './../../@share/models/action.model';
import * as NameActions from './../actions/name.action';
import { ICreateNameResponse, IGetNameResponse } from '../../@share/models/name.model';



@Injectable()
export class NameEffects {
    @Effect() getNames: Observable<Action> = this.actions$.pipe(
        ofType<NameActions.getNameRequest>(NameActions.TypeName.GET_NAME_REQUEST),
        map((action: IActions) => action?.payload),
        switchMap((payload) => {
            return this.nameService.getNames(payload).pipe(
                switchMap((groupResponse: IGetNameResponse) => {
                    return of(new NameActions.getNameSuccess(groupResponse))
                }),
                catchError((error: any) => {
                    return of(new NameActions.getNameFailed(error));
                })
            )
        })
    )

    @Effect() postNames: Observable<Action> = this.actions$.pipe(
        ofType<NameActions.postNameRequest>(NameActions.TypeName.CREATE_NAME_REQUEST),
        map((action: IActions) => action?.payload),
        switchMap((payload) => {
            return this.nameService.postName(payload).pipe(
                switchMap((postNameResponse: ICreateNameResponse) => {
                    return of(new NameActions.postNameSuccess(postNameResponse))
                }),
                catchError((error: any) => {
                    return of(new NameActions.postNameFailed(error));
                })
            )
        })
    )

    constructor(
        private actions$: Actions,
        private nameService: NameService
    ) { }
}