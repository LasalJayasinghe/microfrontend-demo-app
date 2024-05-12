import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { TokenService } from '../../service/secure/token.service';

class MockTokenService {
  isLoggedIn(): boolean {
    return true; 
  }
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: TokenService, useClass: MockTokenService },
      ],
    });

    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
    tokenService = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow navigation when the user is logged in', inject(
    [AuthGuard, TokenService],
    (authGuard: AuthGuard, tokenService: TokenService) => {
      spyOn(tokenService, 'isLoggedIn').and.returnValue(true);

      const canActivate = authGuard.canActivate();

      expect(canActivate).toBeTruthy();
    }
  ));

  it('should block navigation and redirect to login when the user is not logged in', inject(
    [AuthGuard, TokenService],
    (authGuard: AuthGuard, tokenService: TokenService) => {
      spyOn(tokenService, 'isLoggedIn').and.returnValue(false);
      const navigateSpy = spyOn(router, 'navigate');
      navigateSpy.and.returnValue(Promise.resolve(true));

      const canActivate = authGuard.canActivate();

      expect(canActivate).toBeFalsy();
      expect(navigateSpy).toHaveBeenCalledWith(['login']);
    }
  
  ));


  

});
