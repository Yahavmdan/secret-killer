import { Component, OnInit } from '@angular/core';
import { User } from "../../models/User";
import { Session } from "../../models/Session";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SessionService } from "../../services/session.service";
import { ActiveUserService } from "../../services/active-user.service";
import { PusherService } from "../../services/pusher.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: User;
  sessions: Session[] = [];
  sessionForm: FormGroup;

  constructor(private router: Router,
              private sessionService: SessionService,
              private activeUserService: ActiveUserService,
              private fb: FormBuilder,
              private pusher: PusherService) {}

  ngOnInit(): void {
    this.user = this.activeUserService.getActiveUser();
    this.initSessionForm();
    this.getSessions();
    this.setPusher();
  }

  setPusher(): void {
    this.pusher.connection.bind('session', (data: any) => {
      this.sessions.push(data.session);
    });
  }

  initSessionForm(): void {
    this.sessionForm = this.fb.group({
      'name'    : [null, Validators.required],
    });
  }

  getSessions(): void {
    this.sessionService.get()
      .then(res => this.sessions = res)
  }

  storeSession(): void {
    if (!this.sessionForm.valid) {
      return;
    }
    this.sessionService.store(this.sessionForm.get('name')?.value, this.user)
      .then(res => {
        if (res.creator_id === this.user.id) {
          this.sessionForm.get('name')?.reset();
          void this.router.navigate(['session/' + res.id])
          return;
        }
        alert(res.error.message);
      })
  }

  deleteSession(sessionId: number): void {
    let answer = confirm('Are you sure you want to delete the session?');
    if (answer) {
      this.sessionService.delete(sessionId, this.user)
        .then(() => this.getSessions())
      this.sessionForm.get('name')?.reset();
    }
  }

  enterSession(sessionId: number): void {
    void this.router.navigate(['session/' + sessionId])
    void this.sessionService.enter(sessionId);
  }

}
