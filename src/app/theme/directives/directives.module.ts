import { ModuleWithProviders, NgModule } from '@angular/core';

import { BsButtonDirective } from './bs-button/bs-button.directive';


const DIRECTIVES = [
  BsButtonDirective,
];

@NgModule({
  exports: [...DIRECTIVES],
  declarations: [...DIRECTIVES],
})
export class DirectivesModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: DirectivesModule };
  }
}
