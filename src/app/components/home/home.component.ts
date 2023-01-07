import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SessionGroupService } from "../../services/session-group.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  user = null;
  sub: Subscription = new Subscription();
  groups!:EventSource[];


  constructor(private router: Router,
              private sessionGroupService: SessionGroupService) {}

  ngOnInit(): void {
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    void this.router.navigate(['signin']);
  }

  getSessionGroups(): void {
  }

  storeSessionGroup(): void {
    this.sessionGroupService.storeSessionGroup(this.user)
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
