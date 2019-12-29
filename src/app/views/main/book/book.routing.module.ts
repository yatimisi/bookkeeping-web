import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { BookComponent } from './book.component';
import { BookAddComponent } from './add/add.component';
import { BookDetailComponent } from './detail/detail.component';
import { BookCategoryComponent } from './category/category.component';


const routes: Routes = [
  {
    path: '',
    component: BookComponent,
    children: [
      { path: 'add', component: BookAddComponent },
      { path: ':bookID/detail', component: BookDetailComponent },
      { path: ':bookID/authorities', component: BookCategoryComponent },
      { path: ':bookID/categories', component: BookCategoryComponent },
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
