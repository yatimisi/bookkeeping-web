import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { BookComponent } from './book.component';
import { BookAddComponent } from './add/add.component';
import { BookDetailComponent } from './detail/detail.component';


const routes: Routes = [
  {
    path: '',
    component: BookComponent,
    children: [
      { path: 'add', component: BookAddComponent },
      { path: ':bookID/detail', component: BookDetailComponent },
      { path: ':bookID/authorities', component: BookDetailComponent },
      { path: ':bookID/categories', component: BookDetailComponent },
      { path: '', redirectTo: 'add', pathMatch: 'full' },
      { path: '**', redirectTo: 'add', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookRoutingModule { }
