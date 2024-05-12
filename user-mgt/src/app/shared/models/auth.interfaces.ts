export interface LoginResp {
  accessToken: string;
  authorities: string[];
  expiresIn: number;
  refreshToken: string;
  scope: string;
  tokenType: string;
  userData: {}
}

