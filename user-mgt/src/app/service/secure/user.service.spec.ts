import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { environment } from '../../../environments/environment';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should delete a user', inject(
    [HttpTestingController, UserService],
    (httpMock: HttpTestingController, userService: UserService) => {
      const userId = '1';

      userService.deleteUser(userId).subscribe();

      const req = httpMock.expectOne(`${environment.baseUrl}${environment.urlConst}/user/${userId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    }
  ));

  it('should get all users', inject(
    [HttpTestingController, UserService],
    (httpMock: HttpTestingController, userService: UserService) => {
      const queryParams = 'page=1&pageSize=10';

      userService.getAllUsers(queryParams).subscribe();

      const req = httpMock.expectOne(`${environment.baseUrl}${environment.urlConst}/user?${queryParams}`);
      expect(req.request.method).toBe('GET');
      req.flush({});
    }
  ));

  it('should get user profile data', inject(
    [HttpTestingController, UserService],
    (httpMock: HttpTestingController, userService: UserService) => {
      userService.getProfileData().subscribe();

      const req = httpMock.expectOne(`${environment.baseUrl}${environment.urlConst}/user/profile`);
      expect(req.request.method).toBe('GET');
      req.flush({});
    }
  ));

  it('should logout user', inject(
    [HttpTestingController, UserService],
    (httpMock: HttpTestingController, userService: UserService) => {
      userService.logoutUser().subscribe();

      const req = httpMock.expectOne(`${environment.baseUrl}${environment.urlConst}/user/logout`);
      expect(req.request.method).toBe('POST');
      req.flush({});
    }
  ));

  it('should get all user permissions', inject(
    [HttpTestingController, UserService],
    (httpMock: HttpTestingController, userService: UserService) => {
      userService.getAllUserPermission().subscribe();

      const req = httpMock.expectOne(`${environment.baseUrl}${environment.urlConst}/user/role`);
      expect(req.request.method).toBe('GET');
      req.flush({});
    }
  ));

  it('should register user', inject(
    [HttpTestingController, UserService],
    (httpMock: HttpTestingController, userService: UserService) => {
      const userData = {
        username: 'exampleUser',
        email: 'user@example.com',
        password: 'securePassword123',
      };      
      const obj = 'username=exampleUser&email=user@example.com&password=securePassword123';

      userService.registerUser(userData, obj).subscribe();

      const req = httpMock.expectOne(`${environment.baseUrl}${environment.urlConst}/user?${obj}`);
      expect(req.request.method).toBe('PUT');
      req.flush({});
    }
  ));

  it('should update user profile', inject(
    [HttpTestingController, UserService],
    (httpMock: HttpTestingController, userService: UserService) => {
      const userData = {
        username: 'exampleUser',
        email: 'user@example.com',
        password: 'securePassword123',
      };
      userService.updateUserProfile(userData).subscribe();

      const req = httpMock.expectOne(`${environment.baseUrl}${environment.urlConst}/user/profile`);
      expect(req.request.method).toBe('PUT');
      req.flush({});
    }
  ));

  it('should update mobile number', inject(
    [HttpTestingController, UserService],
    (httpMock: HttpTestingController, userService: UserService) => {
      const obj = {};

      userService.updateMobileNumber(obj).subscribe();

      const req = httpMock.expectOne(`${environment.baseUrl}${environment.urlConst}/user/profile/mobile`);
      expect(req.request.method).toBe('PUT');
      req.flush({});
    }
  ));

  it('should send OTP', inject(
    [HttpTestingController, UserService],
    (httpMock: HttpTestingController, userService: UserService) => {
      const obj = {};

      userService.sendOTP(obj).subscribe();

      const req = httpMock.expectOne(`${environment.baseUrl}${environment.urlConst}/user/profile/mobile/otp`);
      expect(req.request.method).toBe('POST');
      req.flush({});
    }
  ));

  it('should update password', inject(
    [HttpTestingController, UserService],
    (httpMock: HttpTestingController, userService: UserService) => {
      const userData = {
        username: 'exampleUser',
        email: 'user@example.com',
        password: 'securePassword123',
      };
      userService.updatePassword(userData).subscribe();

      const req = httpMock.expectOne(`${environment.baseUrl}${environment.urlConst}/user/change-password`);
      expect(req.request.method).toBe('PUT');
      req.flush({});
    }
  ));

});
