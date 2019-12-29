import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { ThemeModule } from '@theme/theme.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';


@NgModule({
  imports: [
    HomeRoutingModule,
    ThemeModule,
    MatCardModule,
  ],
  declarations: [HomeComponent],
})
export class HomeModule { }
