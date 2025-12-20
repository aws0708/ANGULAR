import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card'
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterOutlet,
    RouterLink
],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  loginForm!: FormGroup;
  hide: boolean = false;
  loggedInUser = {};

  // A standard email regex pattern
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      EmailId: ['', [Validators.required]],
      Password: ['', Validators.required]
    });
    this.hide = true;
  }

  // Getter for easy access to form controls in the template
  get EmailId() {
    return this.loginForm.get('EmailId');
  }

  get Password() {
    return this.loginForm.get('Password');
  }

  // Method to clear a specific form control
  clearInput(controlName: string): void {
    this.loginForm.get(controlName)?.setValue('');
  }

  onSubmit(): void {

    // this.auth.login(this.loginForm.value as any).subscribe(res => {
    //   if (res.result) {
    //     this.router.navigateByUrl('/dashboard');
    //     this.loggedInUser = res.data;
    //     console.log("Logged User Data is ", this.loggedInUser);
    //     this.auth.user$.subscribe(user => {
    //       console.log("Anubhaw", user);
    //     });
    //   }
    // })

    this.auth.login(this.loginForm.value as any).subscribe({
      next: (response: any) => {
        if(response.result){
          localStorage.setItem('angular20Token',response.data.token);
          alert("Logged In Successfully !")
          this.router.navigateByUrl('/dashboard');
          this.loggedInUser = response.data;
          console.log("Logged User Data is ", this.loggedInUser);
          this.auth.user$.subscribe(user => {
            console.log("Anubhaw ",user);
          })
        }
        else{
          alert("Not an existing user, SignUp first");
          this.router.navigateByUrl('/signup');
        }
      },
      error: (error: any) => {
        alert('Api call error')
      }
    })

    // behaviorSubject
    // this.auth.user$.subscribe( user =>{
    //   console.log("Anubhaw",user); 
    // })

  }

}
