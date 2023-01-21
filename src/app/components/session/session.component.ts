import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from "../../models/User";
import { Session } from "../../models/Session";
import { ActiveUserService } from "../../services/active-user.service";
import { SessionService } from "../../services/session.service";
import { ActivatedRoute, Router } from "@angular/router";
import { PusherService } from "../../services/pusher.service";

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit, OnDestroy {

  disabled = false;
  user: User;
  users: User[] = [];
  session: Session;

  constructor(private activeUser: ActiveUserService,
              private sessionService: SessionService,
              private route: ActivatedRoute,
              private router: Router,
              private pusher: PusherService) {
  }

  ngOnInit(): void {
    this.user = this.activeUser.getActiveUser();
    this.session = this.route.snapshot.data[0].session;
    this.getUsers();
    this.setPusher();
  }

  setPusher(): void {
    this.pusher.connection.bind('userSession', (data: any) => {
      if (data) {
        if (data.sessionId === this.session.id) {
          this.users = data.users;
          return;
        }
      }
    })
  }

  getUsers(): void {
    this.sessionService.getUsersSessionById(this.session.id)
      .then(res => this.users = res)
  }

  exitSession(): void {
    void this.router.navigate(['dashboard']);
  }

  ngOnDestroy(): void {
    void this.sessionService.exit(this.user.id, this.session.id);
  }
}
