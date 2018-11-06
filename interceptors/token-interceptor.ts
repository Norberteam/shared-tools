import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { AuthService } from '../providers/auth-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.authService.getToken();
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
