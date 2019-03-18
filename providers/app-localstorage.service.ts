import {Injectable} from "@angular/core";
import { Constants } from '../../src/app/app.constants';

@Injectable()
export class AppLocalStorageService {

    constructor() {}

    /**
     * Return data from localStorage
     * @param {String} key - Data key
     * @return {Observable} data
     */
    get(key: string): any {
        return JSON.parse(localStorage.getItem(Constants.APP_BUNDLE_ID + '.' + key)) || null;
    }

    /**
     * Delete data
     * @return {Observable} data
     */
    remove(key: string): void {
        localStorage.removeItem(Constants.APP_BUNDLE_ID + '.' + key);
    }

    /**
     * Save data
     * @param {String} key - Data key
     * @param {Object} data - Data to save
     * @return {Observable} data
     */
    save(key: string, data: any): void {
        localStorage.setItem(Constants.APP_BUNDLE_ID + '.' + key, JSON.stringify(data));
    }

    /**
     * Clear localStorage data
     */
    clear(){
        localStorage.clear();
    }    
}
