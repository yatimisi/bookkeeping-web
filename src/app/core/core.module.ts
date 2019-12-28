import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const MODULES = [
  BrowserAnimationsModule,
  HttpClientModule,
];

const PROVIDERS = [];

const GUARDS = [];

@NgModule({
  imports: [
    CommonModule,
    ...MODULES,
  ],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ...PROVIDERS,
        ...GUARDS,
      ],
    };
  }
}
