import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private loginApiUrl = 'https://api.freeprojectapi.com/api/BusBooking/login';
  private loginApiUrl = 'https://freeapi.miniprojectideas.com/api/User/Login';
  // for this URL run the project on port number 4209
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  isloggedIn$ = this.loggedInSubject.asObservable();

  private userSubject = new BehaviorSubject(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {

    const user = localStorage.getItem('user');
    if (user) {
        this.loggedInSubject.next(true);
        this.userSubject.next(JSON.parse(user));
    }
  }

  login( credentials: { EmailId: string, Password: string } ){
    return this.http.post<any>(this.loginApiUrl,credentials).pipe(
      tap(res => {
        if(res.result){
          this.loggedInSubject.next(true);
          this.userSubject.next(res.data);

          // optional
          localStorage.setItem('user',JSON.stringify(res.data))
          console.log('loggedInData from service ',res.data);
          console.log(this.userSubject?.value);
        }
      })
    );
  }

  logout(){
    this.loggedInSubject.next(false);
    this.userSubject.next(null);
    localStorage.removeItem('user');
    // this.router.navigateByUrl('/login');
    this.router.navigate(['/login']);
  }
}
