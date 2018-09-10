import { Component, Injector } from '@angular/core';
import { AlertController, ToastController, ModalController, NavController, NavParams, Platform, Events } from 'ionic-angular';
import { AppLocalStorageService } from '../providers/app-localstorage.service';
import { AppService } from '../providers/app.service';
import { RemoteServiceProvider } from '../../src/providers/remote-service';
import { PreferencesService } from '../../src/providers/app-preferences.service';
import { StatusBar } from '@ionic-native/status-bar';

@Component({ selector: '', template: '<span></span>' })
export class BasePage {
    private _app: AppService;
    private _alertCtrl: AlertController;
    private _localStorageService: AppLocalStorageService;
    private _modalCtrl: ModalController;
    private _navCtrl: NavController;
    private _navParams: NavParams;
    private _remoteService : RemoteServiceProvider;
    private _toastCtrl: ToastController;
    private _preferencesService: PreferencesService;
    private _platform: Platform;
    private _events: Events;
    private _statusBar: StatusBar;

    constructor(public injector: Injector) {}

    ionViewWillEnter() {
        this.statusBar.overlaysWebView(false);
        this.statusBar.styleDefault();
    }

    ionViewWillLeave() {}
    onTransitionSuccess() {}
    onTransitionError() {}

    openPage(page: string, params: any) {
        this.navCtrl.push(page, params);
    }

    // Get methods used to obtain instances from the injector just once
    // ----------------------------------------------------------------

    // AlertController
    public get alertCtrl(): AlertController {
        if (!this._alertCtrl) {
            this._alertCtrl = this.injector.get(AlertController);
        }
        return this._alertCtrl;
    }

    // StatusBar
    public get statusBar(): StatusBar {
        if (!this._statusBar) {
            this._statusBar = this.injector.get(StatusBar);
        }
        return this._statusBar;
    }

    // Events
    public get events(): Events {
        if (!this._events) {
            this._events = this.injector.get(Events);
        }
        return this._events;
    }

    // Platform
    public get platform(): Platform {
        if (!this._platform) {
            this._platform = this.injector.get(Platform);
        }
        return this._platform;
    }

    // PreferenceService
    public get preferencesService(): PreferencesService {
        if (!this._preferencesService) {
            this._preferencesService = this.injector.get(PreferencesService);
        }
        return this._preferencesService;
    }

    // ToastController
    public get toastCtrl(): ToastController {
        if (!this._toastCtrl) {
            this._toastCtrl = this.injector.get(ToastController);
        }
        return this._toastCtrl;
    }

    // AppLocalStorageService
    public get localStorageService(): AppLocalStorageService {
        if (!this._localStorageService) {
            this._localStorageService = this.injector.get(AppLocalStorageService);
        }
        return this._localStorageService;
    }

    // ModalController
    public get modalCtrl(): ModalController {
        if (!this._modalCtrl) {
            this._modalCtrl = this.injector.get(ModalController);
        }
        return this._modalCtrl;
    }

    // NavController
    public get navCtrl(): NavController {
        if (!this._navCtrl) {
            this._navCtrl = this.injector.get(NavController);
        }
        return this._navCtrl;
    }

    // AppService
    public get app(): AppService {
        if (!this._app) {
            this._app = this.injector.get(AppService);
        }
        return this._app;
    }

    // NavParams
    public get navParams(): NavParams {
        if (!this._app) {
            this._navParams = this.injector.get(NavParams);
        }
        return this._navParams;
    }

    // RemoteServiceProvider
    public get remoteService(): RemoteServiceProvider {
        if (!this._remoteService) {
            this._remoteService = this.injector.get(RemoteServiceProvider);
        }
        return this._remoteService;
    }

    // Helper methods
    public showToastMessage(message: string): void {
        let options = {
            'closeButtonText': 'X',
            'message': message,
            'duration': 3000,
            'position': 'bottom',
            'showCloseButton': true,
            'dismissOnPageChange': true,
            'cssClass': 'Coming-soon'
        };

        let toast = this.toastCtrl.create(options);
        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });
        toast.present();
    }
}