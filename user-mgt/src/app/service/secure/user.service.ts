import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

const BASE_URL = environment.baseUrl + environment.urlConst;
const options = {headers: {}};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getAllUsers(obj: any) {
    return this.http.get<any>(BASE_URL + '/user?' + obj, options);
  }

  deleteUser(id: string) {
    return this.http.delete<any>(BASE_URL + '/user/' + id, options);
  }

  logoutUser() {
    return this.http.post<any>(BASE_URL + '/user/logout', options);
  }

  getAllUserPermission() {
    return this.http.get<any>(BASE_URL + '/user/role', options);
  }

  registerUser(userData: any, obj) {
    return this.http.put<any>(BASE_URL + '/user?' + obj, userData, options);
  }

  getProfileData() {
    return this.http.get<any>(BASE_URL + '/user/profile', options);
  }

  updateUserProfile(userData: any) {
    return this.http.put<any>(BASE_URL + '/user/profile', userData, options);
  }

  updateMobileNumber(obj: any) {
    return this.http.put<any>(BASE_URL + '/user/profile/mobile', obj, options);
  }

  sendOTP(obj: any) {
    return this.http.post<any>(BASE_URL + '/user/profile/mobile/otp', obj, options);
  }

  updatePassword(userData: any) {
    return this.http.put<any>(BASE_URL + '/user/change-password', userData, options);
  }
}
