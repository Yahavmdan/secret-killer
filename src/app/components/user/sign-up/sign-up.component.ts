import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../../../services/user.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

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
    this.userService.signUp(this.signInForm.getRawValue());
  }

  navigate(): void {
    void this.router.navigate(['login']);
  }

}

