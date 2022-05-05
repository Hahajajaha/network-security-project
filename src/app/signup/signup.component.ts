// @ts-ignore
import { HttpClient } from '@angular/common/http';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';


// @ts-ignore
export const passwordMatchValidator: ValidatorFn = (signupForm: FormGroup): ValidationErrors | null => {
  const parent = signupForm.parent as FormGroup;
  if (!parent) {
    return null;
  }
  if (parent.controls['password'].value === parent.controls['confirmedPassword'].value) {
    return null
  } else {
    return { 'passwordMismatch': true };
  }
};

// @ts-ignore
export const passwordRegxValidation: ValidatorFn = (signupForm: FormGroup): ValidationErrors | null => {
  const parent = signupForm.parent as FormGroup;
  if (!parent) {
    return null;
  }
  if (!/.*[0-9].*/.test(parent.controls['password'].value)) {
    return { 'hasNumber': true };
  } else if (!/.*[A-Z].*/.test(parent.controls['password'].value)) {
    return { 'hasCapitalCase': true };
  } else if (!/.*[a-z].*/.test(parent.controls['password'].value)) {
    return { 'hasSmallCase': true };
  } else if (!/[^a-zA-Z0-9]/.test(parent.controls['password'].value)) {
    return { 'hasSpecialCase': true };
  }
};

// @ts-ignore
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  /* Shorthands for form controls (used from within template) */
  get firstname() { return this.signupForm.get('firstname'); }
  get lastname() { return this.signupForm.get('lastname'); }
  get dateofbirth() { return this.signupForm.get('dateofbirth'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get confirmedPassword() { return this.signupForm.get('confirmedPassword'); }

  ngOnInit(): void {
    // @ts-ignore
    this.signupForm = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(1)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(1)]),
      dateofbirth: new FormControl('', [Validators.required, Validators.minLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), passwordRegxValidation],
      ),
      confirmedPassword: new FormControl('', [Validators.required, passwordMatchValidator])
    },
    );
  }


  onSignup() {
    if (this.signupForm.valid) {
      if (this.signupForm.controls['password'].value != this.signupForm.controls['confirmedPassword'].value) {
        alert("Confirmed password doesn't match")
      } else {
        this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value)
          .subscribe(res => {
            // @ts-ignore
            alert("Signup Successfully");
            this.signupForm.reset();
            this.router.navigate(['login']);
          }, err => {
            alert("Something went wrong")
          }
          )
      }
    } else {
      alert("Please complete form correctly")
    }
  }
}


