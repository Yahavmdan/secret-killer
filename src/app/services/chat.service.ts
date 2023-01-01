import { Injectable } from '@angular/core';
import { environmentUrl } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  apiURL = environmentUrl.api;

  header = {
    Accept: 'application/json',
    Authorization: `Bearer ${this.token}`,
  };

  constructor(private httpClient: HttpClient) {}

  get token(): string | null {
    return sessionStorage.getItem('token');
  }

  sendChat(data: { userName: any, message: any }): Observable<any> {
    return this.httpClient.post(`${this.apiURL}/messages`, data)
  }

}