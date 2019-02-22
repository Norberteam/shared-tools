import {Injectable} from "@angular/core";
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';

import { LoadingController } from "ionic-angular";

@Injectable()
export class LoaderService {
    private loader: any;

    constructor(public loadingCtrl: LoadingController) {
    }

    showLoader() {
        this.loader = this.loadingCtrl.create({
          spinner: 'crescent'
        });

        return Observable.fromPromise(this.loader.present());
//        return Observable.of(true);
    }

    dismissLoader() {
        if(this.loader != null)
            this.loader.dismiss();
    }
}
