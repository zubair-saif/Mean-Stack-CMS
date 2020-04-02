import { PostDetailsComponent } from './../../pages/post-details/post-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@home';
import { ProfileComponent } from '@profile';
import { AuthGuard } from '../../shared/core/auth.guard';
import { AddEditPostComponent } from 'app/pages/add-edit-post/add-edit-post.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'my-profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'post-details/1', component: PostDetailsComponent },
  { path: 'new', component: AddEditPostComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: AddEditPostComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicLayoutsRoutingModule { }
