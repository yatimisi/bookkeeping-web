import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


const TEMPLATES = [];

@NgModule({
  imports: [CommonModule],
  exports: [...TEMPLATES],
  declarations: [...TEMPLATES],
})
export class TemplatesModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: TemplatesModule };
  }
}
