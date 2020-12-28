import { GroupService } from './../../@main/services/group.service';
import { IActions } from './../../@share/models/action.model';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import * as GroupActions from './../actions/group.action';
import { GroupModelGet } from '../../@share/models/group.model';

@Injectable()
export class GroupEffects {
    @Effect() getGroups: Observable<Action> = this.actions$.pipe(
        ofType<GroupActions.getGroupRequest>(GroupActions.GET_GROUP_REQUEST),
        map((action: IActions) => action?.payload),
        switchMap((payload) => {
            console.log(payload);
            return this.groupService.getGroups(payload).pipe(
                switchMap((groupResponse: GroupModelGet) => {
                    console.log(groupResponse);
                    return of(new GroupActions.getGroupSuccess(groupResponse))
                }),
                catchError((error: any) => {
                    return of(new GroupActions.getGroupFailed(error));
                })
            )
        })
    )

    constructor(
        private actions$: Actions,
        private groupService: GroupService
    ) { }
}