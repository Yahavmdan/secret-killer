import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from "../services/user.service";
import { ActiveUserService } from "../services/active-user.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService,
              private activeUser: ActiveUserService) {
  }

  canActivate(): Observable<boolean> {
    const user = this.activeUser.getActiveUser();
    return this.userService.hasToken(user);
  }

}
