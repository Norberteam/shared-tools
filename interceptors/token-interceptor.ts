import { PreferencesService } from './../../src/providers/app-preferences.service';
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
    HttpSentEvent,
    HttpHeaderResponse,
    HttpProgressEvent,
    HttpUserEvent
  } from '@angular/common/http';
  import { Observable } from 'rxjs/Observable';
  import 'rxjs/add/operator/do';
  import Rx from 'rxjs/Rx';
import { AuthService } from '../providers/auth-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private preferencesService: PreferencesService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let userProfile = this.preferencesService.getUserProfile();
        let token = userProfile ? userProfile.token : null;
        console.log('INTERCEPTOR: token -> ' + token);
        if(token == null) {
            return next.handle(request);
        } else {
            let req = request.clone({
                setParams: {
                    'access_token': token
                }
            });
            return next.handle(req);
        }
    }
}
