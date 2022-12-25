import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService) {
  }

  canActivate():  boolean {
    const token = sessionStorage.getItem('token');
    this.userService.checkToken()
    return true
  }

}
