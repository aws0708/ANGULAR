import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  loggedInUser: any;
  constructor( public auth: AuthService ){}
  ngOnInit(){
    this.auth.user$.subscribe( user => this.loggedInUser = user );
  }


}
