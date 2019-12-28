import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


const PIPES = [];

@NgModule({
  imports: [CommonModule],
  exports: [
    CommonModule,
    ...PIPES,
  ],
  declarations: [...PIPES],
})
export class PipesModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: PipesModule };
  }
}
