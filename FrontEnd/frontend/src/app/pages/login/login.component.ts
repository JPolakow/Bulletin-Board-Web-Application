import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { VerificationService } from 'src/app/services/verification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    public authservice: AuthServiceService,
    private router: Router,
    private verify: VerificationService
  ) {}
  option: string = this.router.url;
  hasError = false;
  errorMessage = '';

  ngOnInit(): void {
    this.authservice.errorMessage$.subscribe((message) => {
      this.errorMessage = message;
    });
  }

  onlogin(loginform: NgForm) {
    this.hasError = false;
    this.errorMessage = '';

    const username = loginform.value.enteredusername;
    const password = loginform.value.enteredpassword;

    if (!username || !password) {
      this.hasError = true;
      this.errorMessage = 'Please fill in all inputs';
      return;
    }

    if (this.option == '/login') {
      this.authservice
        .login(loginform.value.enteredusername, loginform.value.enteredpassword)
        .subscribe(
          (response) => {
            console.log(response);
            this.router.navigate(['/home']);
          },
          (error: HttpErrorResponse) => {
            this.errorMessage = 'Incorrect username or password.';
            this.hasError = true;
          }
        );
    }
  }
}
