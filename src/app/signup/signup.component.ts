import { HttpClient } from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidatorFn,
  ValidationErrors
} from '@angular/forms';
import { Router } from '@angular/router';
// import {CustomValidators} from "./CustomValidators";

// @ts-ignore
export const passwordMatchValidator: ValidatorFn = (signupForm: FormGroup): ValidationErrors | null => {
  const parent = signupForm.parent as FormGroup;
  console.log(parent);
  if (!parent) {
    return null;
  }
  if(parent.controls['password'].value === parent.controls['confirmedPassword'].value){
    console.log(parent.controls['password'].value);
    console.log(parent.controls['confirmedPassword'].value);
    console.log("====")
    return null
  }else{
    console.log(parent.controls['password'].value);
    console.log(parent.controls['confirmedPassword'].value);
    console.log("!=")
    return { 'passwordMismatch': true };
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

  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router: Router) { }

  /* Shorthands for form controls (used from within template) */
  get firstname() { return this.signupForm.get('firstname'); }
  get lastname() { return this.signupForm.get('lastname'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get confirmedPassword() { return this.signupForm.get('confirmedPassword'); }

  ngOnInit(): void {
    // @ts-ignore
    this.signupForm = new FormGroup(
      {
        firstname : new FormControl('',[Validators.required, Validators.minLength(1)]),
        lastname : new FormControl('',[Validators.required, Validators.minLength(1)]),
        email : new FormControl('',[Validators.required, Validators.email]),
        password : new FormControl('',[Validators.required, Validators.minLength(6)],),
        confirmedPassword: new FormControl('', [Validators.required, passwordMatchValidator])
      },
    );
  }


  onSignup(){
    if (this.signupForm.valid) {
      console.log(this.signupForm);
      if(this.signupForm.controls['password'].value != this.signupForm.controls['confirmedPassword'].value){
        console.log(this.signupForm.controls['password'].value);
        console.log(this.signupForm.controls['confirmedPassword'].value);
        alert("Confirmed password doesn't match")
      }else{
        this.http.post<any>("http://localhost:3000/signupUsers",this.signupForm.value)
          .subscribe(res=>{
              // @ts-ignore
              console.log(this.signupForm.value);
              alert("Signup Successfully");
              this.signupForm.reset();
              this.router.navigate(['login']);
            },err=>{
              alert("Something went wrong")
            }
          )
      }
    }else{
      alert("Please complete form correctly")
    }
  }


  //
  onPasswordInput() {
    if (this.signupForm.hasError('passwordMismatch')) {
        console.log("not match");
        // @ts-ignore
        this.password.setErrors([{'passwordMismatch': true}]);
      }
    else
      { // @ts-ignore
        this.confirmedPassword.setErrors(null);
      }

  }

}


