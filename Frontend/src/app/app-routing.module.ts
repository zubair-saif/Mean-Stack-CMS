import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { PublicLayoutsComponent } from '@public-layouts';
import { AuthLayoutsComponent } from '@auth-layouts';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }, {
    path: '',
    component: PublicLayoutsComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/public-layouts/public-layouts.module').then(m => m.PublicLayoutsModule)

      }
    ]
  },
  {
    path: '',
    component: AuthLayoutsComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/auth-layouts/auth-layouts.module').then(m => m.AuthLayoutsModule)

      }
    ]
  }, {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [
    RouterModule,
    CommonModule,
    BrowserModule
  ]
})
export class AppRoutingModule { }
