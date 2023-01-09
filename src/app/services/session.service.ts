import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environmentUrl } from "../../environments/environment";
import { User } from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  apiURL = environmentUrl.api;

  header = {
    Accept: 'application/json',
    Authorization: `Bearer ${this.token}`,
  };

  constructor(private httpClient: HttpClient) {}

  get token(): string | null {
    return sessionStorage.getItem('token');
  }

  getSession(): EventSource {
    let source = new EventSource(`${this.apiURL}/get/sessions`);
    source.addEventListener('message', message => {
      console.log(message)
    });
    return source;
  }

  storeSession(name: string, user: User): void {
    const data = { userId: user.id, name: 'fdsdsdfsss4325345435ssssssss' }
    this.httpClient.post(`${this.apiURL}/session/store`, data, { headers: this.header }).toPromise()
      .then((res: any) => res)
      .catch(err => err)
  }

  enterSession(user: any): void {
    this.httpClient.post(`${this.apiURL}/enter/session`, user, { headers: this.header }).toPromise()
      .then((res: any) => res)
      .catch(err => err)
  }

}
