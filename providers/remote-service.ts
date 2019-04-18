import { Constants } from './../../src/app/app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the QrCodeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SharedRemoteService {
    // TODO Issue #296: Use environments to manage different versions of APIs
    getApiUrl: string = Constants.API_URL;

    constructor(public http: HttpClient) {
    }

    developmentLogin(provider: string, userType: string) {
        return this.http.post(`${this.getApiUrl}`+ '/users/dev-login', {
            provider, userType
        });
    }
}
