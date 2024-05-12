import { TestBed } from '@angular/core/testing';
import { TokenService } from './token.service';
import { StorageService } from './storage.service'; 

describe('TokenService', () => {
  let service: TokenService;
  let storageService: StorageService; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenService , StorageService ],
    });

    service = TestBed.inject(TokenService);
    storageService = TestBed.inject(StorageService);
    });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get user name', () => {
    const userName = 'TestUser';
    service.setUserName(userName);

    const retrievedUserName = service.getUserName();

    expect(retrievedUserName).toBe(userName);
  });

  it('should get access token', () => {
    const accessToken = 'AccessToken123';
    localStorage.setItem('access_token', accessToken);

    const retrievedAccessToken = service.getAccessToken();

    expect(retrievedAccessToken).toBe(accessToken);
  });

  it('should get refresh token', () => {
    const refreshToken = 'RefreshToken456';
    localStorage.setItem('refresh_token', refreshToken);

    const retrievedRefreshToken = service.getRefreshToken();

    expect(retrievedRefreshToken).toBe(refreshToken);
  });

  it('should check if user is logged in', () => {
    localStorage.setItem('access_token', 'AccessToken789');
    localStorage.setItem('refresh_token', 'RefreshToken012');

    const isLoggedIn = service.isLoggedIn();

    expect(isLoggedIn).toBe(true);
  });

  it('should persist tokens', () => {
    const accessToken = 'NewAccessToken';
    const refreshToken = 'NewRefreshToken';

    service.persistTokens(accessToken, refreshToken);

    expect(service.getAccessToken()).toBe(accessToken);
    expect(service.getRefreshToken()).toBe(refreshToken);
  });

  it('should remove tokens', () => {
    localStorage.setItem('access_token', 'TokenToRemove123');
    localStorage.setItem('refresh_token', 'TokenToRemove456');

    service.removeTokens();

    expect(service.getAccessToken()).toBeFalsy();
    expect(service.getRefreshToken()).toBeFalsy();
  });
  
  it('should remove user name', () => {
    localStorage.setItem('user_name', 'UserToRemove');

    service.removeUserName();

    expect(localStorage.getItem('user_name')).toBeFalsy();
  });

  it('should set and get active menu', () => {
    const subMenu = 'Dashboard';

    storageService.setActiveMenu(subMenu);

    expect(storageService.getActiveMenu()).toEqual(subMenu);
  });

});
