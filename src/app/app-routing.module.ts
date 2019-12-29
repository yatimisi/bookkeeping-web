import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@core/guards/auth.guard';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@views/auth/auth.module')
      .then(module => module.AuthModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('@views/main/main.module')
      .then(module => module.MainModule),
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
