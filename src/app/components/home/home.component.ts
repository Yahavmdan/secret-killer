import { Component, NgIterable, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SessionGroupService } from "../../services/session-group.service";
import { BehaviorSubject, Observable, Subject, Subscription, switchMap } from "rxjs";

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
    // @ts-ignore
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.getSessionGroups();
  }

  logout(): void {
    sessionStorage.removeItem('token');
    void this.router.navigate(['login']);
  }

  getSessionGroups(): void {
    this.groups.push(this.sessionGroupService.getSessionGroup());
  }

  storeSessionGroup(): void {
    this.sessionGroupService.storeSessionGroup(this.user)
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
