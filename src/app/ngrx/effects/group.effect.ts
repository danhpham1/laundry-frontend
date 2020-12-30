import { GroupService } from './../../@main/services/group.service';
import { IActions } from './../../@share/models/action.model';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import * as GroupActions from './../actions/group.action';
import { ICreateGroupResponse, IGroupModelGet } from '../../@share/models/group.model';

@Injectable()
export class GroupEffects {
    @Effect() getGroups: Observable<Action> = this.actions$.pipe(
        ofType<GroupActions.getGroupRequest>(GroupActions.GET_GROUP_REQUEST),
        map((action: IActions) => action?.payload),
        switchMap((payload) => {
            return this.groupService.getGroups(payload).pipe(
                switchMap((groupResponse: IGroupModelGet) => {
                    return of(new GroupActions.getGroupSuccess(groupResponse))
                }),
                catchError((error: any) => {
                    return of(new GroupActions.getGroupFailed(error));
                })
            )
        })
    )

    @Effect() createGroup: Observable<Action> = this.actions$.pipe(
        ofType<GroupActions.createGroupRequest>(GroupActions.CREATE_GROUP_REQUEST),
        map((action: IActions) => action?.payload),
        switchMap((payload) => {
            return this.groupService.createGroup(payload).pipe(
                switchMap((groupResponse: ICreateGroupResponse) => {
                    return of(new GroupActions.createGroupSuccess(groupResponse))
                }),
                catchError((error: any) => {
                    return of(new GroupActions.createGroupFailed(error));
                })
            )
        })
    )

    constructor(
        private actions$: Actions,
        private groupService: GroupService
    ) { }
}