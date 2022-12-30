import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      'userName':         [null, Validators.required],
      'email':            [null, Validators.required],
      'password':         [null, Validators.required],
    });
  }

  submit(): void  {
    if (!this.signInForm.valid) {
      return;
    }
    this.userService.signIn(this.signInForm.getRawValue());
  }

  navigate(): void {
    void this.router.navigate(['login']);
  }

}

