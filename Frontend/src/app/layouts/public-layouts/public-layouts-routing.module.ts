import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@home';
import { ProfileComponent } from '@profile';
import { AuthGuard } from '../../shared/core/auth.guard';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'my-profile', component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicLayoutsRoutingModule { }
