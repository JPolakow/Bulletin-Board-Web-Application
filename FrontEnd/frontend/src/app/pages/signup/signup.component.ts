import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup; // Create a FormGroup

  hasError = false;
  errorMessage = '';

  ngOnInit(): void {}

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder // Inject FormBuilder
  ) {
    this.signupForm = this.formBuilder.group({
      fname: ['', Validators.required],
      sname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSignup() {
    this.hasError = false;

    if (this.signupForm.invalid) {
      this.hasError = true;
      this.errorMessage = 'Please fill out all fields';
      return;
    }

    const user = {
      fname: this.signupForm.value.fname,
      sname: this.signupForm.value.sname,
      username: this.signupForm.value.username,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    };

    this.authService.signup(user).subscribe(
      (v) => {
        if (v === 'Created') {
          this.router.navigate(['/login']);
        } else {
          this.hasError = true;
          this.errorMessage = 'Unexpected response: ' + v;
        }
      },
      (err) => {
        this.hasError = true;
        this.errorMessage = 'Error creating an account, please check your details';
      }
    );
  }
}
