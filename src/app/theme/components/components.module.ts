import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormErrorModule } from './form-error/form-error.module';
import { MenuModule } from './menu/menu.module';
import { NavbarModule } from './navbar/navbar.module';


const COMPONENTS = [
  CommonModule,
  FormErrorModule,
  MenuModule,
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
