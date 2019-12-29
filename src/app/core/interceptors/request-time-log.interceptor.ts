import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '@env/environment';


@Injectable()
export class RequestTimeLogHttpInterceptor implements HttpInterceptor {

  constructor() { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    return next
      .handle(request)
      .pipe(
        tap(event => {
          if (!environment.production && event instanceof HttpResponse) {
            const elapsed = Date.now() - started;
            console.log(`存取網址： ${request.urlWithParams}`);
            console.log(`花費時間： ${elapsed} ms`);
          }
        })
      );
  }
}
