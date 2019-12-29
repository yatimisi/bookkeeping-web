import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarModule } from './navbar/navbar.module';


const COMPONENTS = [
  CommonModule,
  NavbarModule,
];

@NgModule({
  imports: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class ComponentsModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: ComponentsModule };
  }
}
