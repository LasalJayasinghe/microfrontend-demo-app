import {Injectable} from '@angular/core';
import {AuthService} from "../../service/secure/auth.service";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError} from "rxjs";
import {TokenService} from "../../service/secure/token.service";
import {LOGIN_API_PATH, REFRESH_API_PATH} from "../../shared/constants/auth.const";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>('');

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,
    private spinnerService: NgxSpinnerService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = request;
    const accessToken = this.tokenService.getAccessToken();
    if (accessToken) {
      authReq = this.setTokenHeader(request, accessToken);
    }
    return next.handle(authReq)
      .pipe(catchError(error => {
        if (error instanceof HttpErrorResponse && !authReq.url.endsWith(LOGIN_API_PATH) && error.status === 401) {
          return this.handleUnauthorized(authReq, next, error);
        }
        return throwError(() => error);
      }));
  }

  setTokenHeader(request: HttpRequest<any>, accessToken: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  private handleUnauthorized(request: HttpRequest<any>, next: HttpHandler, error: any) {
    if (request.url.endsWith(REFRESH_API_PATH) && error.status === 401) {
      this.tokenService.removeAllSessionsData();
      this.router.navigate(['login']).then();
    } else if (!this.isRefreshing) {
        const rToken = this.tokenService.getRefreshToken();
        this.isRefreshing = true;
        this.refreshTokenSubject.next(null);

        if (rToken) {
          return this.authService.getNewTokens(rToken).pipe(
            switchMap((tokenRes: any) => {
              this.isRefreshing = false;
              this.refreshTokenSubject.next(tokenRes.accessToken);
              return next.handle(this.setTokenHeader(request, tokenRes.accessToken));
            }),
            catchError((error) => {
              this.isRefreshing = false;
              this.spinnerService.hide().then();
              this.authService.logout();
              return throwError(() => error);
            })
          );
        } else {
          this.isRefreshing = false;
          this.spinnerService.hide().then();
          this.authService.logout();
        }
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.setTokenHeader(request, token)))
    );
  }
}
