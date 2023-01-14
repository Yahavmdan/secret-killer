import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActiveUserService } from "../../../services/active-user.service";
import { User } from "../../../models/User";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  user: User;
  navBarActive = true;
  blurOverlay = false;


  constructor(private router: Router,
              private activeUser: ActiveUserService) {}

  ngOnInit(): void {
    window.innerWidth >= 768 ? this.navBarActive = true : this.navBarActive = false;
    this.user = this.activeUser.getActiveUser();
  }

  navigate(navbar:any, ham?:any, url?:any): void {
    if (navbar?.classList.contains('nav-bar-active')) {
      navbar.classList.remove('nav-bar-active');
      this.navBarActive = !this.navBarActive;
      this.blurOverlay = !this.blurOverlay;
    }
    if (ham) {
      this.navBarActive ? ham.style.transform = 'rotate(180deg)' : ham.style.transform = 'rotate(0deg)';
    }
    if (url) {
      void this.router.navigate(url);
    }
  }

  logout(navbar: HTMLElement): void {
    let answer = confirm('Are you sure you want to log-out?');
    if (answer) {
      navbar.classList.toggle('nav-bar-active');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      void this.router.navigate(['']);
    }
  }

  activeNav(nav:any, ham:any): void {
    nav.classList.toggle('nav-bar-active');
    this.blurOverlay = !this.blurOverlay;
    this.navBarActive = !this.navBarActive;
    this.navBarActive ? ham.style.transform = 'rotate(180deg)' : ham.style.transform = 'rotate(0deg)';

  }

}
