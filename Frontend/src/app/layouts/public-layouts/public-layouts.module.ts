import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PublicLayoutsRoutingModule } from './public-layouts-routing.module';
import { HomeComponent } from '@home';
import { ProfileComponent } from '@profile';

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PublicLayoutsRoutingModule,
    HttpClientModule,
    RouterModule
  ]
})
export class PublicLayoutsModule { }
