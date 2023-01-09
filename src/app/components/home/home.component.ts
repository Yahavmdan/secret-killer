import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { User } from "../../models/User";
import { SessionService } from "../../services/session.service";
import { ActiveUserService } from "../../services/active-user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  user: User;
  sub: Subscription = new Subscription();
  groups!:EventSource[];


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

  storeSessionGroup(name: string): void {
    this.sessionService.storeSession(name, this.user)
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
