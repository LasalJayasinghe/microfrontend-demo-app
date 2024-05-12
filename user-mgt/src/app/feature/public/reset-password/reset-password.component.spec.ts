import { ComponentFixture, TestBed, waitForAsync ,fakeAsync,  tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ResetPasswordComponent } from './reset-password.component';
import { AuthService } from '../../../service/secure/auth.service';
import { TokenService } from '../../../service/secure/token.service';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { UtilService } from '../../../service/public/util.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import Swal, {SweetAlertResult} from 'sweetalert2';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import { ROUTE_LOGIN } from '../../../shared/constants/auth.const';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let tokenService: jasmine.SpyObj<TokenService>;
  let spinnerService: jasmine.SpyObj<NgxSpinnerService>;
  let utilService: jasmine.SpyObj<UtilService>;
  let router: jasmine.SpyObj<Router>;
  let commonUtilService: jasmine.SpyObj<UtilService>;;
  const setupTestBed = () => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
      imports: [ReactiveFormsModule, RouterTestingModule,MatCardModule,MatIconModule,NgxSpinnerModule],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: TokenService, useValue: tokenService },
        { provide: NgxSpinnerService, useValue: spinnerService },
        { provide: UtilService, useValue: utilService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();
  };
  beforeEach(waitForAsync(() => {
    authService = jasmine.createSpyObj('AuthService', ['verifyToken', 'submitNewPassword']);
    tokenService = jasmine.createSpyObj('TokenService', ['removeAllSessionsData']);
    spinnerService = jasmine.createSpyObj('NgxSpinnerService', ['show', 'hide']);
    utilService = jasmine.createSpyObj('UtilService', ['confirmPasswordValidator']);
    commonUtilService = jasmine.createSpyObj('UtilsService', ['sweetAlertSuccessMessage']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    setupTestBed();
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
  }));
  it('should create ResetPasswordComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call verifyToken on checkTokenIsValid', fakeAsync(() => {
    const mockResponse = {};

    authService.verifyToken.and.returnValue(of(mockResponse));

    component.checkTokenIsValid('test-token');

    expect(authService.verifyToken).toHaveBeenCalledWith({ verificationCode: 'test-token' });
    expect(authService.verifyToken).toHaveBeenCalledOnceWith({ verificationCode: 'test-token' });
  }));

  it('should handle error', async () => {
    const swalSpy = spyOn(Swal, 'fire').and.callFake(async (options: any) => {
      expect(options.title).toEqual('Opps...');
      expect(options.text).toEqual("The reset link is no longer valid. It has already been used to reset your password or it has expired. Click here to request a new link.");
      expect(options.icon).toEqual('error');

      await options.confirmButtonText(); // Await the confirm button text function to trigger the 'then' block
      expect(router.navigate).toHaveBeenCalledWith(['reset']);

      return { isConfirmed: true } as SweetAlertResult<any>;
    });
    await component.handleError({});
    expect(swalSpy).toHaveBeenCalled();
  });
});
