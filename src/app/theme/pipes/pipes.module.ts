import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormErrorsPipe } from './form-errors.pipe';


const PIPES = [
  FormErrorsPipe,
];

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
