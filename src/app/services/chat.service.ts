import { Injectable } from '@angular/core';
import { environmentUrl } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  apiURL = environmentUrl.api;

  constructor(private httpClient: HttpClient,
              private authService: AuthService) {}

  sendChat(userName: string, message: string ): Observable<any> {
    const data = { userName, message }
    return this.httpClient
      .post(`${this.apiURL}/messages`, data, { headers: this.authService.setHeader() })
  }

}
