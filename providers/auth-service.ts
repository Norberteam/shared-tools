import { AppLocalStorageService } from './app-localstorage.service';
import { RemoteServiceProvider } from './../../src/components/services/remote-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Rx from "rxjs/Rx";
import { Constants } from '../../src/app/app.constants';
import { AppService } from '../../src/components/services/app.service';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthService {
  constructor(public http: HttpClient, private remoteService: RemoteServiceProvider,
    private appLocalStorageService: AppLocalStorageService, private httpClient: HttpClient, private app: AppService) {
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


  socialLogin(profile: any) {
    console.log('Social login AuthService: ' + JSON.stringify(profile));
    try {
        var loginInfo = JSON.parse(decodeURI(profile));
        console.log('SocialLogin: ' + JSON.stringify(loginInfo));

        let userId = loginInfo.accessToken.userId;
        let token = loginInfo.accessToken.id;

        // Renewing local stored access token
//        this.remoteService.renewAccessToken(userId, token);

        // Map response to UserProfile object
        let previousProfile = this.getUserProfile();
        var userProfile: any;
        if(!previousProfile) {
            userProfile = {
                token: token,
                _id: userId,
                email: loginInfo.profiles[0].profile._json.email,
                firstName: loginInfo.profiles[0].profile._json.given_name,
                lastName: loginInfo.profiles[0].profile._json.family_name,
                displayName: loginInfo.profiles[0].profile._json.name,
                company: loginInfo.company ? loginInfo.company : null,
                jobTitle: loginInfo.jobTitle ? loginInfo.jobTitle : null,
                picture: loginInfo.profiles[0].profile._json.picture,
                loginProvider: loginInfo.profiles[0].provider
            }
        } else {
            userProfile = {
                token: token,
                _id: userId,
                email: previousProfile.email ? previousProfile.email : loginInfo.profiles[0].profile._json.email,
                firstName: previousProfile.firstName ? previousProfile.firstName : loginInfo.profiles[0].profile._json.given_name,
                lastName: previousProfile.lastName ? previousProfile.lastName : loginInfo.profiles[0].profile._json.family_name,
                displayName: previousProfile.displayName ? previousProfile.displayName : loginInfo.profiles[0].profile._json.name,
                company: previousProfile.company ? previousProfile.company : loginInfo.company,
                jobTitle: previousProfile.jobTitle ? previousProfile.jobTitle : loginInfo.jobTitle,
                picture: previousProfile.picture ? previousProfile.picture : loginInfo.profiles[0].profile._json.picture,
                loginProvider: loginInfo.profiles[0].provider
            }
        }

        this.loginSuccess(userProfile); // Locally store user Profile
    } catch (e) {
        console.log('Error initiating tabs: ' + e);
    }
  }

  loginSuccess(profile: any) {
    // Store mapped login profile within local database
    console.log('Storing user profile: ' + JSON.stringify(profile));
    this.app.showToast('Login success!');
    this.saveUserProfile(profile);
  }
}
