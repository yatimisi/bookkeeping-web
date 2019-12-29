import { NgModule } from '@angular/core';

import { ThemeModule } from '@theme/theme.module';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';


@NgModule({
  imports: [
    ThemeModule,
    MainRoutingModule,
  ],
  declarations: [MainComponent],
})
export class MainModule { }
