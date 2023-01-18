import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Session } from "../models/Session";
import { SessionService } from "../services/session.service";
import { ActiveUserService } from "../services/active-user.service";
import { User } from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class SessionResolver implements Resolve<Session> {

  user: User;

  constructor(private sessionService: SessionService,
              private activeUserService: ActiveUserService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any  {
    this.user = this.activeUserService.getActiveUser();
     return this.sessionService.getSessionByUserId(this.user.id)
       .then(res => res)
  }
}
