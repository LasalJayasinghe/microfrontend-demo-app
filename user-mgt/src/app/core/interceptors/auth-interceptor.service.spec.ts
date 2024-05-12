import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthInterceptorService } from './auth-interceptor.service';
import { AuthService } from '../../service/secure/auth.service';
import { TokenService } from '../../service/secure/token.service';
import { of } from 'rxjs';

describe('AuthInterceptorService', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let tokenService: TokenService;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        TokenService,
        AuthService,
        NgxSpinnerService,
        AuthInterceptorService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true,
        },
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
    authService = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should add Authorization header with Bearer token when accessToken is present', inject(
    [HttpClient],
    (http: HttpClient) => {
      const testUrl = '/api/test';
      const mockResponse = { data: 'test' };
      const accessToken = 'testAccessToken';

      spyOn(tokenService, 'getAccessToken').and.returnValue(accessToken);

      http.get(testUrl).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpTestingController.expectOne(testUrl);

      expect(req.request.headers.has('Authorization')).toBeTruthy();
      expect(req.request.headers.get('Authorization')).toBe(`Bearer ${accessToken}`);

      req.flush(mockResponse);
    }
  ));

  it('should refresh token and retry request on 401 error', fakeAsync(() => {
    const testUrl = '/api/test';
    const refreshToken = 'testRefreshToken';
    const accessToken = 'newTestAccessToken';
    const mockResponse = { data: 'test' };

    spyOn(tokenService, 'removeAllSessionsData').and.stub();
    spyOn(tokenService, 'getRefreshToken').and.returnValue(refreshToken);
    spyOn(authService, 'getNewTokens').and.returnValue(of({ accessToken }));

    httpClient.get(testUrl).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(testUrl);

    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

    tick();

    const retryReq = httpTestingController.expectOne(testUrl);

    expect(retryReq.request.headers.has('Authorization')).toBeTruthy();
    expect(retryReq.request.headers.get('Authorization')).toBe(`Bearer ${accessToken}`);

    retryReq.flush(mockResponse);
  }));

});

