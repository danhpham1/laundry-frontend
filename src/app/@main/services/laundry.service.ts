import { IPostLaundry, IPostLaundryResponse, IPatchLaundry, IDeleteLaundry } from './../../@share/models/laundry.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IPageOptions } from './../../@share/models/action.model';
import { environment } from './../../../environments/environment';

import { IGetLaundryResponse } from 'src/app/@share/models/laundry.model';
@Injectable({
    providedIn: 'root'
})
export class LaundryService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getLaundry(pageOption?: IPageOptions): Observable<IGetLaundryResponse> {
        if (pageOption) {
            return this.httpClient.get<IGetLaundryResponse>(`${environment.APIEndpoint}${environment.APIPrefix}${environment.APIVersion}${environment.APIGetLaundry}?currentPage=${pageOption?.currentPage}&limit=${pageOption?.limit}`);
        } else {
            return this.httpClient.get<IGetLaundryResponse>(`${environment.APIEndpoint}${environment.APIPrefix}${environment.APIVersion}${environment.APIGetLaundry}`);
        }
    }

    postLaundry(bodyLaundry: IPostLaundry) {
        return this.httpClient.post<IPostLaundryResponse>(`${environment.APIEndpoint}${environment.APIPrefix}${environment.APIVersion}${environment.APIPostLaundry}`,
            {
                ...bodyLaundry
            }
        )
    }

    patchLaundry(laundryPatch: IPatchLaundry) {
        return this.httpClient.patch<IPostLaundryResponse>(`${environment.APIEndpoint}${environment.APIPrefix}${environment.APIVersion}${environment.APIPatchLaundry}${laundryPatch.id}`,
            {
                ...laundryPatch.body
            }
        )
    }

    deleteLaundry(laundryDelete: IDeleteLaundry) {
        return this.httpClient.delete<IPostLaundryResponse>(`${environment.APIEndpoint}${environment.APIPrefix}${environment.APIVersion}${environment.APIDeleteLaundry}${laundryDelete.id}`
        )
    }

}
