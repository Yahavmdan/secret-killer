import { Component, OnInit } from '@angular/core';
import { User } from "../../models/User";
import { ActiveUserService } from "../../services/active-user.service";
import { SessionService } from "../../services/session.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit{

  user: User;

constructor(private activeUser: ActiveUserService,
            private sessionService: SessionService,
            private route: ActivatedRoute) {
}

ngOnInit():void {
  //todo make user session table dont create twice once in clicke on deshboard enter and once in onInit
  this.user = this.activeUser.getActiveUser();
  // @ts-ignore
  const sessionId = Number(this.route.params['_value'].id);
  this.sessionService.enter(sessionId, this.user.id)
    .then(res => {
      console.log(res)})
}

}
