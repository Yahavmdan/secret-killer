import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environmentUrl } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SessionGroupService {

  apiURL = environmentUrl.api;

  header = {
    Accept: 'application/json',
    Authorization: `Bearer ${this.token}`,
  };

  constructor(private httpClient: HttpClient) {
    this.getSessionGroup();
  }

  get token(): string | null {
    return sessionStorage.getItem('token');
  }

  getSessionGroup(): EventSource {
    let source = new EventSource(`${this.apiURL}/get/sessions`);
    source.addEventListener('message', message => {
      console.log(message)
    });
    return source;
  }

  storeSessionGroup(user: any): void {
    this.httpClient.post(`${this.apiURL}/store/session`, user).toPromise()
      .then((res: any) => res)
      .catch((err) => {
        console.log(err)})
  }

  enterSessionGroup(user: any): void {
    this.httpClient.post(`${this.apiURL}/enter/session`, user, { headers: this.header }).toPromise()
      .then((res: any) => res)
  }

}
