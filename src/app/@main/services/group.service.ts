import { IPageOptions } from './../../@share/models/action.model';
import { environment } from './../../../environments/environment';
import { GroupModelGet } from './../../@share/models/group.model';
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

  getGroups(pageOption?: IPageOptions): Observable<GroupModelGet> {
    return this.httpClient.get<GroupModelGet>(`${environment.APIEndpoint}${environment.APIPrefix}${environment.APIVersion}${environment.APIGetGroups}?currentPage=${pageOption?.currentPage}&limit=${pageOption?.limit}`, {
      params: {
        ...pageOption?.sort
      }
    });
  }
}
