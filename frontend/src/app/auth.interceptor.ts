import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './shared/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('giphy')) {
      req = req.clone({
        headers: req.headers.set(
          'Authorization',
          `Bearer ${this.userService.richieUser.token || ''}`
        )
      });
    }
    return next.handle(req);
  }
}
