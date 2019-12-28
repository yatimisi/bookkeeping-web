import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


const LAYOUTS = [];

@NgModule({
  imports: [CommonModule],
  exports: [
    CommonModule,
    ...LAYOUTS,
  ],
  declarations: [...LAYOUTS],
})
export class LayoutsModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: LayoutsModule };
  }
}
