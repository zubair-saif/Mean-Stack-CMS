import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@login';
// import { RegisterComponent } from '@register';


const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: LoginComponent },
  { path: 'forget', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthLayoutsRoutingModule { }
