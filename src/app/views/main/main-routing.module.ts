import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { MainComponent } from './main.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '404',
        loadChildren: () => import('@views/main/not-found/not-found.module')
          .then(module => module.NotFoundModule),
      },
      { path: '', redirectTo: '404', pathMatch: 'full' },
      { path: '**', redirectTo: '404', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule { }
