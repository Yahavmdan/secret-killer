import { Injectable } from '@angular/core';
import { User } from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class ActiveUserService {

  user: User;

  constructor() {
  }

  getActiveUser(): User {
    this.user = JSON.parse(sessionStorage.getItem('user')!);
    return this.user;
  }

}
