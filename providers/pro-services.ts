import { Injectable } from '@angular/core';
import {Pro} from '@ionic/pro';
import Rx from "rxjs/Rx";
import { Constants } from '../../src/app/app.constants';

/*
  Generated class for the ProServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var IonicPro;

@Injectable()
export class ProServicesProvider {
    deployChannel: string = 'Dev';

    constructor() {
        console.log('Hello ProServicesProvider Provider');
        this.initIonicPro();
    }

    initIonicPro() {
        IonicPro = Pro.init(Constants.IONIC_PRO_ID, {
            appVersion: Constants.APP_VERSION
        })
    }

    toggleConfig(channelName: string) {
        const config = {
            channel: channelName
        }

        return Rx.Observable.fromPromise(Pro.deploy.init(config))
            .switchMap(obs => this.checkChannel())
            .switchMap(obs => this.performAutomaticUpdate());
    }

    checkChannel() {
        return Rx.Observable.fromPromise(Pro.deploy.info())
        .flatMap((res: any) => {
            this.deployChannel = res.channel;
            return Rx.Observable.of(true);
        });
    }

    performAutomaticUpdate() {
      /*
          This code performs an entire Check, Download, Extract, Redirect flow for
          you so you don't have to program the entire flow yourself. This should
          work for a majority of use cases.
      */
      return Rx.Observable.fromPromise(Pro.deploy.checkAndApply(true, function(progress){
          console.log('Progress: ' + progress);
      })).flatMap((resp: any) => {
          if(resp.update) return Rx.Observable.of(true);
          else return Rx.Observable.of(false);
      });
    }

}
