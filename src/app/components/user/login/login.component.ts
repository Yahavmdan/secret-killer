import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      'emailOrUserName'   : [null, Validators.required],
      'password'          : [null, Validators.required],
    });
  }

  signUp(): void {
    void this.router.navigate(['signup']);
  }

  submit(): void  {
    if (!this.loginForm.valid) {
      return;
    }
    this.userService.login(this.loginForm.getRawValue());
  }

}
