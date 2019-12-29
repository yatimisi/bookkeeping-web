import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { JwtInterceptor } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

import { AuthService } from '@core/services/auth.service';
import { environment } from '@env/environment';
import { Router } from '@angular/router';


@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  private serverURL = environment.serverURL;

  constructor(
    private authService: AuthService,
    private router: Router,
    private jwtInterceptor: JwtInterceptor,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.jwtInterceptor.isWhitelistedDomain(request) || this.jwtInterceptor.isBlacklistedRoute(request)) {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      catchError((error) => {
        const errorResponse = error as HttpErrorResponse;
        const refreshStatus = [400, 401, 403, 404, 408, 500, 502, 503, 504];

        // HTTP Status Code: refreshStatus
        // Exclude: request.url is refreshURL
        // These states require a refresh token.
        if (
          refreshStatus.indexOf(errorResponse.status) !== -1 &&
          request.url !== `${this.serverURL}/${this.authService.urls.refresh}`
        ) {
          return this.authService.refresh().pipe(mergeMap(
            () => this.jwtInterceptor.intercept(request, next)
          ));
        }

        // Exclude the above.
        // In addition to NoNavigatestatus, other http status codes are re-imported login.
        const NoNavigatestatus = [400, 403];
        if (NoNavigatestatus.indexOf(errorResponse.status) === -1) {
          this.authService.logout();
          this.router.navigate(['/auth/login']);
        }

        return throwError(error);
      })
    );
  }
}
