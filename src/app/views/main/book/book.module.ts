import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { ThemeModule } from '@theme/theme.module';
import { BookComponent } from './book.component';
import { BookRoutingModule } from './book.routing.module';
import { BookAddComponent } from './add/add.component';
import { BookDetailComponent } from './detail/detail.component';
import { BookCategoryComponent } from './category/category.component';


@NgModule({
  imports: [
    BookRoutingModule,
    ThemeModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
  ],
  declarations: [
    BookComponent,
    BookAddComponent,
    BookDetailComponent,
    BookCategoryComponent,
  ],
})
export class BookModule { }
