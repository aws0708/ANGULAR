import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  // Always run this application on localhost:4209
  loggedInUser: any;
  constructor( public auth: AuthService, private http: HttpClient ){
    this.getUsers();
  }
  ngOnInit(){
    this.auth.user$.subscribe( user => this.loggedInUser = user );
  }
  getUsers() {
    this.http.get("https://freeapi.miniprojectideas.com/api/User/GetAllUsers").subscribe({
      next: (response: any) => {
        console.log(response.data.slice(0,2));
        
      },
      error: (error) => {
      }
    })
  }



}
