import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm!: FormGroup;
  signUpSuccess = false;
  signUpError = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.signupForm = this.fb.group({
      userId: [0],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNo: [''],
      // altMobileNo: [''],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
      // password: ['']

    });
  }

  onSubmit() {
    this.signUpSuccess = false;
    this.signUpError = '';
    if (this.signupForm.valid) {
      this.http.post('https://freeapi.miniprojectideas.com/api/User/CreateNewUser', this.signupForm.value)
        .subscribe({
          next: (res:any) => {
            if(!res.result){
              this.signUpSuccess = false;
              this.signUpError = res.message;
              alert("Existing Email, Signup with different email and password")
            }
            else{
            this.signUpSuccess = true;
            this.signUpError = '';
            this.signupForm.reset({ userId: 0 });
            // this.router.navigateByUrl('/login');
            alert("Signed up Successfully, Please login");
            this.router.navigateByUrl('/login');
            }
            console.log(res);
            
          },
          error: () => {
            this.signUpError = 'Sign up failed. Please try again later.';
          }
        });
    }
  }

  get f() { return this.signupForm.controls; }

}
