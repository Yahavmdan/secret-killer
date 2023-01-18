import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from "../../models/User";
import { Session } from "../../models/Session";
import { ActiveUserService } from "../../services/active-user.service";
import { SessionService } from "../../services/session.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit, OnDestroy {

  user: User;
  session: Session;

  constructor(private activeUser: ActiveUserService,
              private sessionService: SessionService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.user = this.activeUser.getActiveUser();
    this.session = this.route.snapshot.data[0].sessions;
  }

  exitSession(): void {
    void this.router.navigate(['dashboard']);
  }

  ngOnDestroy(): void {
    void this.sessionService.exit(this.user.id);
  }
}
