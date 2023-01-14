import { Component, OnInit } from '@angular/core';
import { User } from "../../models/User";
import { ActiveUserService } from "../../services/active-user.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User;


  constructor(private activeUser: ActiveUserService) {}

  ngOnInit(): void {
    this.user = this.activeUser.getActiveUser();
  }

}
