import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";

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

  signIn(): void {
    void this.router.navigate(['signin']);
  }

  submit(): void  {
    if (!this.loginForm.valid) {
      return;
    }
    this.userService.login(this.loginForm.getRawValue());
  }

}
