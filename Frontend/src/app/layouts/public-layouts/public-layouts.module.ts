import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PublicLayoutsRoutingModule } from './public-layouts-routing.module';
import { HomeComponent } from '@home';
import { ProfileComponent } from '@profile';
import { PostDetailsComponent } from '../../pages/post-details/post-details.component';
import { AddEditPostComponent } from '../../pages/add-edit-post/add-edit-post.component';

@NgModule({
  declarations: [

    HomeComponent,
    ProfileComponent,
    PostDetailsComponent,
    AddEditPostComponent
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
