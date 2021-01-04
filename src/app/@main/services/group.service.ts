import { IPageOptions } from './../../@share/models/action.model';
import { environment } from './../../../environments/environment';
import { ICreateGroupBody, ICreateGroupResponse, IGroupModelGet, IUpdateGroupBody } from './../../@share/models/group.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getGroups(pageOption?: IPageOptions): Observable<IGroupModelGet> {
    return this.httpClient.get<IGroupModelGet>(`${environment.APIEndpoint}${environment.APIPrefix}${environment.APIVersion}${environment.APIGetGroups}?currentPage=${pageOption?.currentPage}&limit=${pageOption?.limit}`, {
      params: {
        ...pageOption?.sort
      }
    });
  }

  createGroup(body?: ICreateGroupBody) {
    return this.httpClient.post<ICreateGroupResponse>(
      `${environment.APIEndpoint}${environment.APIPrefix}${environment.APIVersion}${environment.APIGetGroups}`,
      { ...body }
    )
  }

  updateGroup(body?: IUpdateGroupBody) {
    return this.httpClient.patch<ICreateGroupResponse>(
      `${environment.APIEndpoint}${environment.APIPrefix}${environment.APIVersion}${environment.APIPatchGroup}${body?.id}`,
      { ...body }
    )
  }
}
