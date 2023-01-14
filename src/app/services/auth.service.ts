import { Injectable } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setHeader(): any {
    const token = sessionStorage.getItem('token');
    return {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }

}
