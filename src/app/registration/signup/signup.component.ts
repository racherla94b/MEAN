import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from "rxjs";

import { AuthService } from '../auth.service';

export interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  isLoading = false;
  private authStatusSub: Subscription;

  constructor(public authService: AuthService) { }

  roles: Role[] = [
    {value: "admin", viewValue: "Admin"},
    {value: "sme", viewValue: "SME"},
    {value: "business-user", viewValue: "Business User"},
    {value: "user", viewValue: "User"}
  ];

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        console.log(authStatus);
        this.isLoading = false;
    });
  }

  onSignup(signupForm: NgForm) {
    if(signupForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.signup(signupForm.value);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
