import { ICreateNameResponse, IPostName, IUpdateName, IUpdateNameResponse, IDeleteNameResponse } from './../../@share/models/name.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IPageOptions } from './../../@share/models/action.model';
import { environment } from './../../../environments/environment';
import { IGetNameResponse } from 'src/app/@share/models/name.model';
@Injectable({
  providedIn: 'root'
})
export class NameService {

  constructor(
    private httpClient:HttpClient
  ) { }

  getNames(pageOption?:IPageOptions):Observable<IGetNameResponse>{
    if(pageOption){
      return this.httpClient.get<IGetNameResponse>(`${environment.APIEndpoint}${environment.APIPrefix}${environment.APIVersion}${environment.APIGetNames}?currentPage=${pageOption?.currentPage}&limit=${pageOption?.limit}`);
    }else{
      return this.httpClient.get<IGetNameResponse>(`${environment.APIEndpoint}${environment.APIPrefix}${environment.APIVersion}${environment.APIGetNames}`);
    }
  }

  postName(data:IPostName):Observable<ICreateNameResponse>{
    return this.httpClient.post<ICreateNameResponse>(
      `${environment.APIEndpoint}${environment.APIPrefix}${environment.APIVersion}${environment.APIPostName}`,
      {...data}
    );
  }

  patchName(idName: string, data: IUpdateName): Observable<IUpdateNameResponse> {
    return this.httpClient.patch<IUpdateNameResponse>(
      `${environment.APIEndpoint}${environment.APIPrefix}${environment.APIVersion}${environment.APIPatchName}${idName}`,
      { ...data }
    );
  }

  deleteName(idName: string,idGroup:string): Observable<IDeleteNameResponse> {
    return this.httpClient.delete<IDeleteNameResponse>(
      `${environment.APIEndpoint}${environment.APIPrefix}${environment.APIVersion}${environment.APIDeleteName}${idName}?idGroup=${idGroup}`,
    );
  }
}
