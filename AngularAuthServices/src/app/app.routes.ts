import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'login', component: LoginFormComponent },
    {path:'signup', component: SignupComponent},
    {path: 'dashboard', component: DashboardComponent },
    {path: 'userlist', component: UserListComponent },
    {path: '**', redirectTo:'login' }
];
