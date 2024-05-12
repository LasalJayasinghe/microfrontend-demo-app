import { ComponentFixture, TestBed, waitForAsync, fakeAsync , tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../service/secure/auth.service';
import { TokenService } from '../../../service/secure/token.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Router } from '@angular/router';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import Swal from 'sweetalert2';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let tokenService: jasmine.SpyObj<TokenService>;
  let router: Router;

  const setupTestBed = () => {
    authService = jasmine.createSpyObj('AuthService', ['proceedLogin', 'getInitialRoute']);
    authService.getInitialRoute.and.returnValue('/dashboard');

    tokenService = jasmine.createSpyObj('TokenService', ['isLoggedIn']);
    tokenService.isLoggedIn.and.returnValue(false); // Default to not logged in

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule,MatCardModule,MatIconModule,NgxSpinnerModule],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: TokenService, useValue: tokenService }
      ],
    }).compileComponents();
  };

  beforeEach(waitForAsync(() => {

    setupTestBed();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form', () => {
    expect(component.loginForm).toBeDefined();
  });

  it('should not navigate to dashboard if not logged in', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(router.navigate).not.toHaveBeenCalled();
  }));

  it('should handle error correctly', async () => {
    spyOn(Swal, 'fire').and.resolveTo();
    const error = { error: { error: { message: 'Test error message' } } };
    await component.handleError(error);

    expect(Swal.fire).toHaveBeenCalledWith('Opps!', 'Test error message', 'error');
  });
});
