import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const AUTH_API ='https://bitraze.org/BTRZ/BTRZ/User/'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  
forgotPassword(value: { regid: string; email: string }): Observable<any> {
  return this.http.post(AUTH_API + 'Forget_password', {
    regid: value.regid,
    email: value.email
  });
}

}
