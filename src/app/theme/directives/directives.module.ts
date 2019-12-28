import { ModuleWithProviders, NgModule } from '@angular/core';


const DIRECTIVES = [];

@NgModule({
  exports: [...DIRECTIVES],
  declarations: [...DIRECTIVES],
})
export class DirectivesModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: DirectivesModule };
  }
}
