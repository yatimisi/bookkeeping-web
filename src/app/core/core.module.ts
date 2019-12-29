import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { HttpBodyInterceptor } from './interceptors/http-body.interceptor';
import { RequestTimeLogHttpInterceptor } from './interceptors/request-time-log.interceptor';
import { JWTModule } from './modules/jwt.module';


const MODULES = [
  BrowserAnimationsModule,
  HttpClientModule,
  SweetAlert2Module.forRoot(),
  JWTModule.forRoot(),
];

const PROVIDERS = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpBodyInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: RequestTimeLogHttpInterceptor,
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
