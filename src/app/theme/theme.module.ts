import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';
import { LayoutsModule } from './layouts/layouts.module';
import { PipesModule } from './pipes/pipes.module';
import { TemplatesModule } from './templates/templates.module';


const NG_MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
];

const LOCAL_MODULES = [
  ComponentsModule,
  DirectivesModule,
  LayoutsModule,
  PipesModule,
  TemplatesModule,
];

const THIRD_PARTY_MODULES = [];

@NgModule({
  imports: [CommonModule],
  exports: [
    ...NG_MODULES,
    ...LOCAL_MODULES,
    ...THIRD_PARTY_MODULES,
  ],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: ThemeModule };
  }
}
