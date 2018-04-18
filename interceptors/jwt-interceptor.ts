// src/app/auth/jwt.interceptor.ts
import { AuthService } from '../providers/auth-service';
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

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    isRefreshingToken: boolean = false;
    tokenSubject: Rx.BehaviorSubject<string> = new Rx.BehaviorSubject<string>(null);

    constructor(private authService: AuthService) {}

    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        console.log('BO adding token to request: ' + token);
        return req.clone({ setHeaders: { Authorization: 'Authorization ' + token }})
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {

            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
//                    console.log('Http 401 Unauthorized response INTERCEPTED: ' + request.url);
//                    this.authService.refreshToken().subscribe(token => console.log('Subscribe called, token: ' + token));
                }
            }
        });
    }
}
