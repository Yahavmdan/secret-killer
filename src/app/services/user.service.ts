import { Injectable } from '@angular/core';
import { User } from "../models/User";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environmentUrl } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL = environmentUrl.client;
  apiURL = environmentUrl.api;

    header = {
    Accept: 'application/json',
    Authorization: `Bearer ${this.token}`,
  };

  constructor(private httpClient: HttpClient,
              private router: Router) {}

  get token(): string | null {
    return sessionStorage.getItem('token');
  }

  checkToken(): void {
    this.httpClient.get(`${this.apiURL}/check/token`,{headers: this.header})
      .toPromise()
      .then(res => {
        console.log(
          res
        )})
      .catch(err => {
        console.log(err)})
  }

  signIn(data: User): void {
    this.httpClient.post<{ user: User, token: string }>(`${this.apiURL}/sign-in`, data).toPromise()
      .then(res => {
        sessionStorage.setItem('token', res!.token);
        void this.router.navigate(['home']);
      })
      .catch(err => {
        console.log(err.error.message)
      });
  }

  login(data: User): void {
    this.httpClient.post<{ user: User, token: string }>(`${this.apiURL}/login`, data, {headers: this.header}).toPromise()
      .then(res => {
        sessionStorage.setItem('token', res!.token);
        void this.router.navigate(['home']);
      })
      .catch(err => {
        console.log(err.error.message)
      })
  }

}

//
// import { Injectable } from '@angular/core';
// import { HttpClient } from "@angular/common/http";
// import { Router} from "@angular/router";
// import { BehaviorSubject, Observable } from "rxjs";
// import { User} from "../models/user";
// import { environmentUrl } from "../../environments/environment";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//
//   user$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
//   tokenType = null
//
//   header = {
//     Accept: 'application/json',
//     Authorization: `Bearer ${this.token}`,
//   };
//
//   URL = environmentUrl.client
//   apiURL = environmentUrl.api
//
//   constructor(private httpClient: HttpClient, private router: Router) {
//   }
//
//   get token(): string | null {
//     return sessionStorage.getItem('token');
//   }
//
//   getTokenType(data): boolean | Promise<boolean> {
//     this.httpClient.post(`${this.apiURL}/check-token`, data)
//       .toPromise()
//       .then(res => {
//         this.tokenType = res['responseCode'];
//         this.user$.next(this.tokenType);
//         sessionStorage.setItem('userType', this.tokenType);
//       })
//       .catch(() => {
//         if (location.href !== `${this.URL}/home`) {
//           this.router.navigate(['no-permission-page']).then()
//         }
//       })
//     return this.tokenType === 1;
//   }
//
//
//   createUser(data: any): Observable<{ user: User, token: string }> {
//     return this.httpClient.post<{ user: User, token: string }>(`${this.apiURL}/register`, data, {
//       headers: this.header,
//     });
//   }
//
//   logInUser(data: any): Observable<{ user: User, token: string }> {
//     return this.httpClient.post<{ user: User, token: string }>(`${this.apiURL}/login`, data, {
//       headers: this.header,
//     });
//   }
//
//   sendResetPasswordEmail(email) {
//     return this.httpClient.post(`${this.apiURL}/send-forgot-password-email`, email);
//   }
//
//   resetPassword(data) {
//     return this.httpClient.put(`${this.apiURL}/reset-password`, data, {
//       headers: this.header,
//     });
//   }
//
// }
