import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public authservice: AuthServiceService, private router: Router) {}

  option: string = this.router.url;
  errorMessage: string = '';

  ngOnInit(): void {
    this.authservice.errorMessage$.subscribe((message) => {
      this.errorMessage = message;
    });
  }

  onlogin(loginform: NgForm) {
    console.log('onlogin method is being called.');

    if (loginform.invalid) {
      console.log('onlogin is invalid.');
      return;
    }

    this.errorMessage = '';

    if (this.option == '/login') {
      this.authservice
        .login(loginform.value.enteredusername, loginform.value.enteredpassword)
        .subscribe(
          (response) => {
            console.log(response);
            this.router.navigate(['/home']);
          },
          (error: HttpErrorResponse) => {
            if (error.status === 401) {
              // Handle the 401 Unauthorized error by displaying an error message
              this.errorMessage = 'Incorrect username and password.';
            } else {
              // Handle other error cases
              this.errorMessage = 'An unknown error has occurred.';
            }
          }
        );
    }
  }
}
