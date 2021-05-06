import { environment } from './../../../environments/environment';
import { IRegisterBody, IRegisterResponse, IRegisterFailedResponse } from './../models/register';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient:HttpClient
  ) { }

    registerUser(body:IRegisterBody){
      return this.httpClient.post<IRegisterResponse>(
        `${environment.APIEndpoint}${environment.APIPrefix}${environment.APIVersion}${environment.APIPostUser}`,
        {
          ...body
        }
      )
    }
}
