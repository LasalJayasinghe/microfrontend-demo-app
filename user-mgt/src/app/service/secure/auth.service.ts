import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {TokenService} from "./token.service";
import {UserService} from "./user.service";
import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {
  DEFAULT_MENU,
  LOGIN_API_PATH,
  ROUTE_DASHBOARD,
  ROUTE_LOGIN
} from "../../shared/constants/auth.const";
import {environment} from "../../../environments/environment";
import {LoginResp} from "../../shared/models/auth.interfaces";
import {StorageService} from "./storage.service";

const BASE_URL = environment.baseUrl + environment.urlConst;
const options = {headers: {'Authorization': 'Basic ' + environment.loginToken}};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usernameSrc = new BehaviorSubject<string>('');
  username: Observable<string> = this.usernameSrc.asObservable();
  loginResp: LoginResp | undefined;
  isLoggedIn = false;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private http: HttpClient,
    private userService: UserService,
    private storageService: StorageService
  ) {
    const username = tokenService.getUserName();
    if (!!username) {
      this.setUsername(username);
    }
  }

  private static handleError(error: HttpErrorResponse): any {

    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      errorMessage = `Error: ${error.error.message}`;
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => {
      return errorMessage;
    });
  }

  proceedLogin(loginData: any) {
    this.tokenService.removeRefreshToken();

    return this.http.post<any>(BASE_URL + LOGIN_API_PATH, loginData, options).pipe(
      tap((response) => {
          if (response && response.accessToken && response.refreshToken) {
            this.loginResp = response;
            // In here add new permission like this, but once put these permission into DB this can be remove
            // response.authorities = []; // Reset all backend permission only for testing
            // response.authorities.push('MENU_USER_MGT');
            this.tokenService.persistTokens(response.accessToken, response.refreshToken);
            // This will be use for permission handling
            // this.tokenService.setRolePermission(JSON.stringify(response.authorities));
            // this.loadPermissions();
            this.isLoggedIn = true;
            this.getUserData().subscribe((data: any) => {
              this.setUsername(data.firstName + ' ' + data.lastName);
              this.storageService.setActiveMenu(DEFAULT_MENU);
              this.tokenService.setUserName(data.firstName + ' ' + data.lastName);
            });
          }

        }
      ),
      // catchError(AuthService.handleError)
    );
  }

  getUserData() {
    return this.http.get<any>(BASE_URL + '/user/profile', options);
  }

  // getPermissions(): string[] {
  //   if (this.loginResp) {
  //     return this.loginResp.authorities;
  //   } else {
  //     return this.tokenService.getRolePermission();
  //   }
  // }
  // public loadPermissions(): void {
  //   this.permissionsService.loadPermissions(this.getPermissions());
  // }

  resetPassword(email: any) {
    return this.http.post<any>(BASE_URL + '/user/recover-password', email, options);
  }

  verifyToken(email: any) {
    return this.http.post<any>(BASE_URL + '/user/verify', email, options);
  }

  submitNewPassword(email: any) {
    return this.http.post<any>(BASE_URL + '/user/verify/change-password', email, options);
  }

  private setUsername(username: string) {
    this.usernameSrc.next(username);
  }

  // User logout function
  logout() {
    this.userService.logoutUser().subscribe({
      next: this.handleLogoutResp.bind(this),
      error: this.handleErrorResp.bind(this)
    })
  }

  handleLogoutResp(res) {
    this.tokenService.removeAllSessionsData();
    this.router.navigate(['login']).then();
  }

  handleErrorResp(res) {
    this.tokenService.removeAllSessionsData();
    this.router.navigate(['login']).then();
  }

  getNewTokens(refreshToken: any): Observable<any> {
    this.tokenService.removeTokens();
    const url = BASE_URL + '/user/refresh';
    const body = {
      refreshToken: refreshToken,
    };
    return this.http.post<any>(url, body, options).pipe(
      tap((res) => {
        this.tokenService.persistTokens(res.accessToken, res.refreshToken);
      }),
      catchError(err => {
        this.tokenService.removeAllSessionsData();
        this.router.navigate(['login']).then();
        return throwError(() => err);
      })
    );
  }

  public getInitialRoute(): string {
    if (!this.tokenService.isLoggedIn()) {
      console.error('User not logged in or permissions unavailable.');
      this.tokenService.removeAllSessionsData();
      return ROUTE_LOGIN;
    } else {
      return ROUTE_DASHBOARD;
    }
  }
}
