import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpBodyInterceptor } from './interceptors/http-body.interceptor';
import { JWTModule } from './modules/jwt.module';


const MODULES = [
  BrowserAnimationsModule,
  HttpClientModule,
  JWTModule.forRoot(),
];

const PROVIDERS = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpBodyInterceptor,
    multi: true
  },
];

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
