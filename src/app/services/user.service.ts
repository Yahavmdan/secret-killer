import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environmentUrl } from "../../environments/environment";
import { User } from "../models/User";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURL = environmentUrl.api;

  constructor(private httpClient: HttpClient,
              private router: Router) {}

  get token(): string | null {
    return sessionStorage.getItem('token');
  }

  hasToken(user: User): Observable<boolean> {
    const data = {token: this.token, userId: user.id};
    // @ts-ignore
    return this.httpClient.post(`${this.apiURL}/check/token`, data)
  }

  signIn(data: { password: string, userName: string, email: string }): void {
    this.httpClient.post(`${this.apiURL}/sign-in`, data).toPromise()
      .then((res: any) => {
        this.handleLogSignIn(res);
      })
  }

  login(data: { password: string, emailOrUserName: string }): void {
    this.httpClient.post(`${this.apiURL}/login`, data).toPromise()
      .then((res: any) => {
        this.handleLogSignIn(res);
      })
  }

  handleLogSignIn(res: User): void {
    sessionStorage.setItem('token', res.token);
    sessionStorage.setItem('user', JSON.stringify(res));
    void this.router.navigate(['home'])
  }

}
