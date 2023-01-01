import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environmentUrl } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

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

  hasToken(token: string | null): Promise<boolean> {
    return this.httpClient.post(`${this.apiURL}/check/token`, token).toPromise()
      .then(res => res)
      .catch(err => err)
  }

  signIn(data: { password: string, userName: string, email: string }): void {
    this.httpClient.post(`${this.apiURL}/sign-in`, data).toPromise()
      .then((res: any) => {
        sessionStorage.setItem('token', res.token);
        this.hasToken(sessionStorage.getItem('token'))
          .then(void this.router.navigate(['home']))
          .catch(err => {
            console.log(err.error.message)
          });
      })
  }

  login(data: { password: string, userName: string }): void {
    this.httpClient.post(`${this.apiURL}/login`, data).toPromise()
      .then((res: any) => {
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('user', JSON.stringify(res.user));
        this.hasToken(res.token)
          .then(void this.router.navigate(['home']))
          .catch(err => {
            console.log(err.error.message)
          })
      })
  }

  storeSessionGroup(user: any): void {
    this.httpClient.post(`${this.apiURL}/store/session`, user).toPromise()
      .then((res: any) => res)
  }

  enterSessionGroup(user: any): void {
    this.httpClient.post(`${this.apiURL}/enter/session`, user, { headers: this.header }).toPromise()
      .then((res: any) => res)
  }

}
