import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    RouterModule,
    NgbModule
  ]
})
export class AuthLayoutsModule { }
