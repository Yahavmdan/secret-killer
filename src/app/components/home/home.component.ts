import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "../../models/User";
import { SessionService } from "../../services/session.service";
import { ActiveUserService } from "../../services/active-user.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User;


  constructor(private router: Router,
              private sessionService: SessionService,
              private activeUserService: ActiveUserService) {}

  ngOnInit(): void {
    this.user = this.activeUserService.getActiveUser();
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    void this.router.navigate(['']);
  }

  getSessionGroups(): void {
  }

  storeSessionGroup(): void {
    //
  }

}
