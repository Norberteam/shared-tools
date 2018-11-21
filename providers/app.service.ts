import {Injectable, OnInit} from "@angular/core";
import {Loading, LoadingController, ToastController, Platform} from 'ionic-angular';
import {Constants} from '../../src/app/app.constants';
import {AppLocalStorageService} from './app-localstorage.service';

@Injectable()
export class AppService implements OnInit {
    static instance: AppService;
    public accountJWT: any; // user's infos jwt
    public isAuth: boolean = false; // if user is authenticated
    public isPushwooshOn: boolean = false; // if user is authenticated
    public isTrackingOn: boolean = false; // if user is authenticated
    public translation; // all translations
    private loading: Loading; // loader
    public mainTabRef: any;

    constructor(private appLocalStorageService: AppLocalStorageService,
                private loadingCtrl: LoadingController,
                private toastCtrl: ToastController,
                private platform: Platform) {
        return AppService.instance = AppService.instance || this;
    }

    public _account: any; // user's infos

    get account(): any {
        if (!this._account) {
            let lsUser = this.appLocalStorageService.get(Constants.LS['USER']);
            this.account = lsUser;
        }
        return this._account;
    }

    set account(account: any) {
        this._account = account;
    }

    ngOnInit() {
        // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        // Add 'implements OnInit' to the class.
    }

    /**
     * Call a number
     * @param phoneNumber
     */
    call(phoneNumber: string) {
        window.open('tel:' + phoneNumber);
    }

    /**
     * Hide current loading page
     */
    hideLoading() {
        if (this.loading) {
            this.loading.dismiss()
                .then(() => {
                    this.loading = null;
                });
        }
    }

    /**
     * Parse JWT token
     * @param token
     */
    parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    /**
     * Show a loading page
     * @param title string
     */
    showLoading(title?: string) {
        this.hideLoading();
        this.loading = this.loadingCtrl.create({
            content: this.translation['MESSAGE'].WAIT,
            dismissOnPageChange: false,
            spinner: 'crescent'
        });
        this.loading.present();
    }

    /**
     * Display an Coming soon toast
     */
    showToastComingSoon() {
        let options = {
            'closeButtonText': 'X',
            'message': 'Coming Soon ...',
            'duration': 3000,
            'position': 'top',
            'showCloseButton': true,
            'dismissOnPageChange': true,
            'cssClass': 'Coming-soon'
        };
        let toast = this.toastCtrl.create(options);
        toast.present();
    }

    /**
     * Display an error toast
     * @param options
     */
    showToastError(options?: Object) {
        options = options || {
            'closeButtonText': 'X'
        };
        options['message'] = options['message'] || this.translation.TOAST['ERROR'];
        options['duration'] = options['duration'] || 3000;
        options['position'] = options['position'] || 'top';
        options['showCloseButton'] = options['showCloseButton'] || true;
        options['dismissOnPageChange'] = options['dismissOnPageChange'] || true;
        options['cssClass'] = (options['cssClass'] || '') + ' error';
        let toast = this.toastCtrl.create(options);
        toast.present();
    }

    showErrorMessage(message: string) {
        this.showToastError({
            message: message,
            position: 'bottom'
        });
    }

    showSuccessMessage(message: string) {
        this.showToastSuccess({
            message: message,
            position: 'bottom'
        });
    }

    /**
     * Display a success toast
     * @param options
     */
    showToastSuccess(options?: Object) {
        options = options || {
            'closeButtonText': 'X'
        };
        options['message'] = options['message'] || this.translation.TOAST['SUCCESS'];
        options['duration'] = options['duration'] || 3000;
        options['position'] = options['position'] || 'top';
        options['showCloseButton'] = options['showCloseButton'] || true;
        options['dismissOnPageChange'] = options['dismissOnPageChange'] || true;
        options['cssClass'] = (options['cssClass'] || '') + ' success';
        let toast = this.toastCtrl.create(options);
        toast.present();
    }

    isMobilePlatform() {
        if ( this.platform.is('core') || this.platform.is('mobileweb') ) return false;
        else return true;
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

    /**
     * show tab bar
     *
     */
    showTabbar(isShow) {
        var list = document.getElementsByClassName('tabbar');
        if (list) {
            for (var i = 0; i < list.length; i++) {
            if (isShow)
                (<HTMLInputElement>list[i]).style.display = 'flex';
            else
                (<HTMLInputElement>list[i]).style.display = 'none';
            }
        } else {
            console.log('tabbar element is not available.');
        }
    }

    public getModalOptions() {
        return {
            horizontalSlide: {
                showBackdrop: true,
                enableBackdropDismiss: true,
                enterAnimation: 'modal-translate-up-enter',
                leaveAnimation: 'modal-translate-up-leave'
            }
        }
    }

    showPopover(htmlRef) {
        event.stopPropagation();
        if(htmlRef.classList.contains('is-active')) {
          htmlRef.classList.remove('is-active');
          return; //break here to avoid adding class 'is-active' below
        } 
        
        //Loop in all submenus to disable submenu in htmlRef and add it the clicked one
        let ElementsOpened = document.querySelectorAll(".submenu");
        [].forEach.call(ElementsOpened, el => {
          if (el.classList.contains('is-active')) {
            el.classList.remove('is-active');
          }
        });
    
        htmlRef.classList.add('is-active');
    
        this.listenClickOutside(htmlRef);
      }

      listenClickOutside (selector) {
        document.addEventListener("click", function(event:any) {
          if (event.target.closest(".submenu")) {return};
    
          if (selector.classList.contains("is-active")){
            selector.classList.remove("is-active");
          }
        });
      }
}
