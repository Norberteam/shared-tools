import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppLocalStorageService } from './app-localstorage.service';
import { Injectable } from '@angular/core';
import { Constants } from '../../src/app/app.constants';
import { AppService } from './app.service';
import {Observable} from 'rxjs/Observable';
import { Platform } from 'ionic-angular';
import { SafariViewController } from '@ionic-native/safari-view-controller';
import { JwtService } from './jwt/jwt-service';
import { PreferencesService } from './../../src/providers/app-preferences.service';
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
    private safariViewController: SafariViewController,
    private jwtService: JwtService,
    private preferencesService: PreferencesService
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

  /**
   * Open web authentification page:
   * -- Android: open with native browser instance
   * -- iOs: open with SafariViewController
   * -- Browser: redirect the user
   * @param webUrl
   * @param mobileUrl
   */
  openAuthPage(webUrl: string, mobileUrl: string, nodeEnv: string) {
    let url: string;
    if (this.platform.is('core') || this.platform.is('mobileweb')) { // Web case
      console.log('Web case calling');
      url = webUrl;
    } else { // Mobile case
      console.log('Mobile case url');
      url = mobileUrl;
      if (nodeEnv === 'localDev')
        url = `https://localhost:3000${mobileUrl}`;
    }
    if (this.platform.is('ios')) {
      this.openUrlSafariController(url);
    } else {
      this.openUrlInAppWebBrowser(url);
    }
  }

  /*
    Check if login needs being bypassed
  */
  isBypassLoginEnabled(constants) {
    return constants.BYPASS_LOGIN && constants.NODE_ENV === 'localDev';
  }

  getUserProfile() {
    return this.appLocalStorageService.get(Constants.LS['USER']);
  }

  socialLogin(jwtToken: string) {
    const decoded : any = this.jwtService.decode(jwtToken);
    if(decoded && decoded.payload && decoded.payload.error) {
        const payload = decoded.payload;
        return { error: true, msg: payload.msg };
    } else return this.loginSuccess(decoded.payload); // Locally store user Profile
  }

  loginSuccess(profile: any) {
    // Store mapped login profile within local database
    console.log('Storing user profile: ' + JSON.stringify(profile));
    this.app.showToastMessage('Login success!');
    this.saveUserProfile(profile);
    return profile.token;
  }

  // Remove credentials and partially local storage
  removeLocalData() {
    this.appLocalStorageService.clear(); //Clearing all data available on localStorage
    this.app.isAuth = false;
  }

  /**
   * Destroy database/user data
   * @return
   */
  logout(isAuth: boolean, isVisitor?: boolean) {
    const user = this.appLocalStorageService.get(Constants.LS['USER']);
    const accessToken = user ? user.token : "";
    let deepLink;
    if (this.platform.is('core') || this.platform.is('mobileweb')) {
        deepLink = false;
    } else {
        deepLink = true;
    }
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

  handleRouteGuard(nav: any, page: string) {
      if (!this.preferencesService.isUserProfile()){
        nav.setRoot(page);
    }
  }
}
