import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthLayoutsRoutingModule } from './auth-layouts-routing.module';
import { LoginComponent } from '@login';
import { RegisterComponent } from '@register';


@NgModule({

  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthLayoutsRoutingModule,
    HttpClientModule,
    RouterModule
  ]
})
export class AuthLayoutsModule { }
