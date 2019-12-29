import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MenuComponent } from './menu.component';
import { MenuOptionComponent } from './option/option.component';


@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
  ],
  exports: [MenuComponent],
  declarations: [MenuComponent, MenuOptionComponent],
})
export class MenuModule { }
