import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { UserService } from './user.service';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { ROUTE_DASHBOARD, ROUTE_LOGIN , LOGIN_API_PATH} from '../../shared/constants/auth.const';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import {environment} from "../../../environments/environment";
const BASE_URL = environment.baseUrl + environment.urlConst;


describe('AuthService', () => {
  let authService: AuthService;
  let tokenService: TokenService;
  let userService: UserService;
  let storageService: StorageService;
  let router: Router;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService, TokenService, UserService, StorageService],
    });

    authService = TestBed.inject(AuthService);
    tokenService = TestBed.inject(TokenService);
    userService = TestBed.inject(UserService);
    storageService = TestBed.inject(StorageService);
    router = TestBed.inject(Router);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should get initial route for logged-in user', () => {
    spyOn(tokenService, 'isLoggedIn').and.returnValue(true);

    const initialRoute = authService.getInitialRoute();

    expect(initialRoute).toBe(ROUTE_DASHBOARD);
  });

  it('should get initial route for not logged-in user', () => {
    spyOn(tokenService, 'isLoggedIn').and.returnValue(false);

    const initialRoute = authService.getInitialRoute();

    expect(initialRoute).toBe(ROUTE_LOGIN);
  });

  it('should handle error with handleError', () => {
    const mockErrorResponse = new HttpErrorResponse({
      error: 'test error',
      status: 500,
      statusText: 'Internal Server Error',
    });
    const handleErrorSpy = spyOn<any>(AuthService as any, 'handleError').and.callThrough();
    AuthService['handleError'](mockErrorResponse);
    expect(handleErrorSpy).toHaveBeenCalledWith(mockErrorResponse);
  });

  it('should handle login response and set tokens', fakeAsync(() => {
    const mockLoginData = { /* Your mock login data */ };
    const mockResponse = {
      accessToken: 'mockAccessToken',
      refreshToken: 'mockRefreshToken',
      // ... other properties
    };

    spyOn(tokenService, 'removeRefreshToken');
    spyOn(authService, 'getUserData').and.returnValue(of({ firstName: 'John', lastName: 'Doe' }));
    spyOn(tokenService, 'persistTokens');

    let actualResponse: any;
    authService.proceedLogin(mockLoginData).subscribe(response => {
      actualResponse = response;
    });

    const loginRequest = httpTestingController.expectOne(BASE_URL + LOGIN_API_PATH);
    expect(loginRequest.request.method).toBe('POST');
    loginRequest.flush(mockResponse);

    tick();

    expect(tokenService.removeRefreshToken).toHaveBeenCalled();
    expect(authService.getUserData).toHaveBeenCalled();
    expect(tokenService.persistTokens).toHaveBeenCalledWith('mockAccessToken', 'mockRefreshToken');
    expect(actualResponse).toEqual(mockResponse);
  }));

  it('should get user data', fakeAsync(() => {
    const mockUserData = { firstName: 'John', lastName: 'Doe' };

    let actualUserData: any;
    authService.getUserData().subscribe(userData => {
      actualUserData = userData;
    });

    const userDataRequest = httpTestingController.expectOne(BASE_URL + '/user/profile');
    expect(userDataRequest.request.method).toBe('GET');
    userDataRequest.flush(mockUserData);
    tick();

    expect(actualUserData).toEqual(mockUserData);
  }));

  it('should handle successful token refresh', fakeAsync(() => {
    spyOn(tokenService, 'removeTokens');
    spyOn(tokenService, 'persistTokens');
    spyOn(router, 'navigate');

    const mockResponse = { accessToken: 'newAccessToken', refreshToken: 'newRefreshToken' };

    authService.getNewTokens('mockRefreshToken').subscribe();

    const req = httpTestingController.expectOne(BASE_URL + '/user/refresh');
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse);

    tick();

    expect(tokenService.removeTokens).toHaveBeenCalled();
    expect(tokenService.persistTokens).toHaveBeenCalledWith('newAccessToken', 'newRefreshToken');
    expect(router.navigate).not.toHaveBeenCalled();
  }));

  it('should handle token refresh error', fakeAsync(() => {
    spyOn(tokenService, 'removeAllSessionsData');
    spyOn(router, 'navigate');

    authService.getNewTokens('mockRefreshToken').subscribe(
      () => {},
      (error) => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpTestingController.expectOne(BASE_URL + '/user/refresh');
    expect(req.request.method).toEqual('POST');
    req.error(new ErrorEvent('Mock network error'), { status: 500 });

    tick();

    expect(tokenService.removeAllSessionsData).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  }));

  it('should handle successful logout', fakeAsync(() => {
    spyOn(tokenService, 'removeAllSessionsData');
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    authService.handleLogoutResp('mockResponse');

    tick();

    expect(tokenService.removeAllSessionsData).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  }));

  it('should call resetPassword API', () => {
    const email = { email: 'test@example.com' };

    authService.resetPassword(email).subscribe();

    const req = httpTestingController.expectOne(BASE_URL + '/user/recover-password');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(email);

    req.flush({ success: true });
  });

  it('should call verifyToken API', () => {
    const email = { email: 'test@example.com' };

    authService.verifyToken(email).subscribe();

    const req = httpTestingController.expectOne(BASE_URL + '/user/verify');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(email);

    req.flush({ success: true });
  });

  it('should call submitNewPassword API', () => {
    const email = { email: 'test@example.com' };

    authService.submitNewPassword(email).subscribe();

    const req = httpTestingController.expectOne(BASE_URL + '/user/verify/change-password');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(email);

    req.flush({ success: true });
  });


});

