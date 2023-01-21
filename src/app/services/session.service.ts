import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environmentUrl } from "../../environments/environment";
import { User } from "../models/User";
import { Session } from "../models/Session";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  apiURL = environmentUrl.api;

  constructor(private httpClient: HttpClient,
              private auth: AuthService) {}

  get(): Promise<Session[]> {
    return this.httpClient
      .get(`${this.apiURL}/sessions/index`, {headers: this.auth.setHeader()})
      .toPromise()
      .then(res => res as Session[])
      .catch(err => {
        alert(err.error.message)
        return [];
      });
  }

  store(name: string, user: User): Promise<Session | any> {
    const data = { userId: user.id, name: name }
    return this.httpClient
      .post(`${this.apiURL}/session/store`, data, { headers: this.auth.setHeader() })
      .toPromise()
      .then(res => res as Session)
      .catch(err => err)
  }

  delete(sessionId: number, user: User): Promise<any> {
    const data = { sessionId, user }
    return this.httpClient
      .post(`${this.apiURL}/session/delete`, data, {headers: this.auth.setHeader()})
      .toPromise()
      .then((res: any) => res)
      .catch(err => err)
  }

  enter(sessionId: number, userId: number): Promise<any> {
    const data = { sessionId, userId }
    return this.httpClient
      .post(`${this.apiURL}/session/enter`, data, {headers: this.auth.setHeader()})
      .toPromise()
      .then((res: any) => res)
      .catch(err => err)
  }

  getSessionByUserId(userId: number): Promise<Session> {
    return this.httpClient
      .get(`${this.apiURL}/session/${userId}`, {headers: this.auth.setHeader()})
      .toPromise()
      .then((res: any) => res)
      .catch(err => err)
  }

  getUsersSessionById(sessionId: number): Promise<User[]> {
    return this.httpClient
      .get(`${this.apiURL}/sessions/${sessionId}`, {headers: this.auth.setHeader()})
      .toPromise()
      .then((res: any) => res)
      .catch(err => err)
  }

  exit(userId: number, sessionId: number): Promise<Session> {
    const data = { sessionId, userId }
    return this.httpClient
      .post(`${this.apiURL}/session/exit`, data, {headers: this.auth.setHeader()})
      .toPromise()
      .then((res: any) => res)
      .catch(err => err)
  }

}
