import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ThemeModule } from '@theme/theme.module';
import { BookComponent } from './book.component';
import { BookRoutingModule } from './book.routing.module';
import { BookAddComponent } from './add/add.component';


@NgModule({
  imports: [
    BookRoutingModule,
    ThemeModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [
    BookComponent,
    BookAddComponent,
  ],
})
export class BookModule { }
