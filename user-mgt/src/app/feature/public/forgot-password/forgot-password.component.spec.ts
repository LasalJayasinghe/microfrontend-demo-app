import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ForgotPasswordComponent } from './forgot-password.component';
import { TokenService } from '../../../service/secure/token.service';
import { UtilService } from '../../../service/public/util.service';
import { AuthService } from '../../../service/secure/auth.service';
import { of } from 'rxjs';
import {MatCardModule} from "@angular/material/card";
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';


describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let tokenService: TokenService;
  let authService: AuthService;
  let utilService: UtilService;
  let spinnerService: jasmine.SpyObj<NgxSpinnerService>;

  beforeEach(async () => {
    spinnerService = jasmine.createSpyObj('NgxSpinnerService', ['show', 'hide']);

    await TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        MatCardModule,
        NgxSpinnerModule
      ],
      providers: [
        TokenService,
        UtilService,
        AuthService, // Add AuthService
        { provide: NgxSpinnerService, useValue: spinnerService }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService); // Add AuthService
    utilService = TestBed.inject(UtilService); // Add UtilService
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form properly', () => {
    component.ngOnInit();
    expect(component.forgotPwForm).toBeDefined();
    expect(component.forgotPwForm.get('email')).toBeDefined();
  });

  it('should handle resetPassword response', () => {
    spyOn(utilService, 'sweetAlertSuccessMessage').and.stub();

    const testData = { message: 'Password reset successful', status: 'success' };
    component.handleResetPasswordResp(testData);

    expect(component.submitted).toBeFalsy();
  });

  it('should handle error', () => {
    spyOn(utilService, 'sweetAlertErrorMessage').and.stub();

    const error = {
      status: 404,
      message: 'User not found',
      errorCode: 'USER_NOT_FOUND'
    };
        component.handleError(error);

    expect(component.submitted).toBeFalsy();
  });
});
