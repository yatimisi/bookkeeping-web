import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';

import { ComponentsModule } from '@theme/components/components.module';

import { OneColumnLayoutComponent } from './one-column/one-column.layout';
import { TwoColumnLayoutComponent } from './two-column/two-column.layout';


const LAYOUTS = [
  OneColumnLayoutComponent,
  TwoColumnLayoutComponent,
];

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    ComponentsModule,
  ],
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
