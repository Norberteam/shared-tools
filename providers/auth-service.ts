import { AppLocalStorageService } from './../../src/components/services/app-localstorage.service';
import { RemoteServiceProvider } from './../../src/components/services/remote-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Rx from "rxjs/Rx";
import { Constants } from '../../src/app/app.constants';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthService {
  constructor(public http: HttpClient, private remoteService: RemoteServiceProvider,
    private appLocalStorageService: AppLocalStorageService, private httpClient: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  }

  saveUserProfile(profile) {
  //        console.log('Auth service saving user profile : ' + JSON.stringify(profile));
    this.appLocalStorageService.save(Constants.LS['USER'], profile);
  }

  getToken() {
    let userProfile = this.getUserProfile();

    if(userProfile) return userProfile.token;
    else return null;
  }

  getUserProfile() {
    return this.appLocalStorageService.get(Constants.LS['USER']);
  }
}
