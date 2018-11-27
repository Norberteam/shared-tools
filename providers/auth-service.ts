import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppLocalStorageService } from './app-localstorage.service';
import { Injectable } from '@angular/core';
import { Constants } from '../../src/app/app.constants';
import { AppService } from './app.service';
import {Observable} from 'rxjs/Observable';
import { Platform } from 'ionic-angular';
import { SafariViewController } from '@ionic-native/safari-view-controller';
import * as _ from 'lodash';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthService {
  constructor(
    private appLocalStorageService: AppLocalStorageService, 
    private app: AppService,
    private platform: Platform,
    private safariViewController: SafariViewController
  ) {
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
        console.log('Login info: ' + loginInfo);
        console.log('Provider found : ' + loginInfo.profiles[0].profile._json.provider);
        if(!previousProfile) {
            userProfile = {
                token: token,
                _id: userId,
                provider: loginInfo.profiles[0].profile._json.provider,
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
                email: loginInfo.profiles[0].profile._json.email,
                provider: loginInfo.profiles[0].profile._json.provider,
                firstName: loginInfo.profiles[0].profile._json.given_name,
                lastName: loginInfo.profiles[0].profile._json.family_name,
                displayName: loginInfo.profiles[0].profile._json.name,
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
    this.app.showToastMessage('Login success!');
    this.saveUserProfile(profile);
  }

  // Remove credentials and partially local storage
  removeLocalData() {
    this.appLocalStorageService.remove(Constants.LS['USER']);
    this.app.isAuth = false;
  }

  /**
   * Destroy database/user data
   * @return
   */
  logout(isAuth: boolean, isVisitor?: boolean) {
    const user = this.appLocalStorageService.get(Constants.LS['USER']);
    const accessToken = user ? user.token : "";
    let deepLink = false;
    let visitorParam = (isVisitor) ? '&app=visitor' : '';

    this.removeLocalData();
    const redirectUrl = `${Constants.API_URL}/auth/logout?deepLink=${deepLink}&access_token=${accessToken}${visitorParam}`;
    try {
      if (this.platform.is('ios')) {
          this.openUrlSafariController(redirectUrl);
      } else {
          this.openUrlInAppWebBrowser(redirectUrl);
      }
    } catch (e) {
        console.log(e);
    }    
  }

  openUrlSafariController(url) {
    Observable.from(this.safariViewController.isAvailable())
        .flatMap(available => {
            if (!available) return Observable.throw('SAFARI_VIEW_CONTROLLER_NOT_AVAILABLE');
            else return this.safariViewController.show({
                url: url,
                hidden: false,
                animated: false,
                transition: 'curl',
                enterReaderModeIfAvailable: true,
                tintColor: '#ff0000'
            });
        }).subscribe((result: any) => { }, (err: any) => {
            console.error('Error trying to open safari view controller: ' + err);
            this.openUrlInAppWebBrowser(url);
        });
  }

  openUrlInAppWebBrowser(url) {
    const browser = new InAppBrowser();
    const browserRef = browser.create(url, '_system');
  }
}
