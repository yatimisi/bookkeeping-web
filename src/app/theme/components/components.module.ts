import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


const COMPONENTS = [
  CommonModule,
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
