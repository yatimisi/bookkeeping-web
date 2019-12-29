import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './navbar.component';
import { NotAuthComponent } from './not-auth/not-auth.component';
import { WebsiteComponent } from './website/website.component';


const COMPONENTS = [
  NavbarComponent,
  NotAuthComponent,
  WebsiteComponent,
];

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
})
export class NavbarModule { }
