import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule, JwtInterceptor, JWT_OPTIONS } from '@auth0/angular-jwt';

import { LocalStorageKeys } from '@core/enums/local-storage-keys.enum';
import { RefreshTokenInterceptor } from '@core/interceptors/refresh-token.interceptor';
import { environment } from '@env/environment';


export function jwtOptionsFactory() {
  return {
    tokenGetter: () => localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN),
    whitelistedDomains: [environment.serverURL.split('://')[1]],
    blacklistedRoutes: [
      `${environment.serverURL}/token`
    ]
  };
}

const MODULES = [
  JwtModule.forRoot({
    jwtOptionsProvider: {
      provide: JWT_OPTIONS,
      useFactory: jwtOptionsFactory
    }
  }),
];

const PROVIDERS = [
  JwtInterceptor,
  {
    provide: HTTP_INTERCEPTORS,
    useExisting: JwtInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: RefreshTokenInterceptor,
    multi: true
  }
];

@NgModule({
  imports: [
    CommonModule,
    ...MODULES
  ],
})
export class JWTModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: JWTModule,
      providers: PROVIDERS,
    };
  }
}
