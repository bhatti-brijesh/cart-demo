import { ToasterService } from './../shared/toaster.service';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const authRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [LoginComponent, RegistrationComponent],
  imports: [
    RouterModule.forChild(authRoutes),
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [ToasterService]
})
export class AuthModule { }
