import {Injectable} from '@angular/core';
import {TOKEN} from "../../shared/constants/token.const";
import {STORAGE} from "../../shared/constants/storage.const";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  setUserName(userName): void {
    localStorage.setItem(TOKEN.USER_NAME, userName);
  }

  getUserName(): string {
    return localStorage.getItem(TOKEN.USER_NAME) ?? '';
  }

  getAccessToken(): string {
    return localStorage.getItem(TOKEN.ACCESS_TOKEN) ?? '';
  }

  getRefreshToken(): string {
    return localStorage.getItem(TOKEN.REFRESH_TOKEN) ?? '';
  }

  public isLoggedIn(): boolean {
    return !!(localStorage.getItem(TOKEN.ACCESS_TOKEN) && localStorage.getItem(TOKEN.REFRESH_TOKEN));
  }

  // setRolePermission(rolePermission): void {
  //   localStorage.setItem(TOKEN.ROLE_PERMISSION, rolePermission);
  // }
  //
  // getRolePermission(): string[] {
  //   return JSON.parse(localStorage.getItem(TOKEN.ROLE_PERMISSION) as string);
  // }

  private persistAccessToken(accessToken): void {
    localStorage.setItem(TOKEN.ACCESS_TOKEN, accessToken);
  }

  private persistRefreshToken(refreshToken): void {
    localStorage.setItem(TOKEN.REFRESH_TOKEN, refreshToken);
  }

  persistTokens(accessToken, refreshToken): void {
    this.persistAccessToken(accessToken);
    this.persistRefreshToken(refreshToken);
  }

  removeTokens(): void {
    this.removeAccessToken();
    this.removeRefreshToken();
  }

  private removeAccessToken(): void {
    localStorage.removeItem(TOKEN.ACCESS_TOKEN);
  }

  removeRefreshToken(): void {
    localStorage.removeItem(TOKEN.REFRESH_TOKEN);
  }

  removeActiveMenu(): void {
    localStorage.removeItem(STORAGE.SUB_MENU);
  }

  removeUserName(): void {
    localStorage.removeItem(TOKEN.USER_NAME);
  }

  // removeRolePermission(): void {
  //   localStorage.removeItem(TOKEN.ROLE_PERMISSION);
  // }

  removeAllSessionsData() {
    this.removeTokens();
    this.removeUserName();
    this.removeActiveMenu();
  }
}
