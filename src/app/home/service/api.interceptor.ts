import { HTTP_INTERCEPTORS, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { TokenStorageService } from '../service/token-storage.service';
import { Observable } from 'rxjs';
const TOKEN_HEADER_KEY = 'Authorization'; 
@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;
    const token1 = this.token.getToken();
    if (token1) {
      req = req.clone({
        setHeaders: {
          'User-Agent': 'nithyasri2023',
          'Authorization': 'Bearer ' + token1,
          'Content-Type': 'application/json', 
        }
      });
    }
    return next.handle(authReq);
  }
}
export const apiInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
];
