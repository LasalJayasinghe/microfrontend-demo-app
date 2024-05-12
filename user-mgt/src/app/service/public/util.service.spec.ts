import { TestBed } from '@angular/core/testing';
import { UtilService } from './util.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


describe('UtilService', () => {
  let service: UtilService;
  let snackBar: MatSnackBar;
  let formBuilder: FormBuilder;
  // let router: Router;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatSnackBarModule],
      providers: [UtilService],
    });

    service = TestBed.inject(UtilService);
    snackBar = TestBed.inject(MatSnackBar);
    // router = TestBed.inject(Router);
    formBuilder = new FormBuilder();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should create the success snackbar', () => {
    spyOn(snackBar, 'open').and.stub();

    const content = 'Success Snackbar';
    const action = 'Dismiss';

    service.snackbarSuccessMessage(content, action);

    expect(snackBar.open).toHaveBeenCalledWith(content, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['green-snackbar'],
    });
  });

  it('should create the error snackbar', () => {
    spyOn(snackBar, 'open').and.stub();

    const content = 'Error Snackbar';
    const action = 'Dismiss';

    service.snackbarErrorMessage(content, action);

    expect(snackBar.open).toHaveBeenCalledWith(content, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['red-snackbar'],
    });
  });

  it('should create the info snackbar', () => {
    spyOn(snackBar, 'open').and.stub();

    const content = 'Info Snackbar';
    const action = 'Dismiss';

    service.snackbarInfoMessage(content, action);


    expect(snackBar.open).toHaveBeenCalledWith(content, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['yellow-snackbar'],
    });
  });

  it('should create a form group with matching passwords and no errors', () => {
    const formGroup: FormGroup = formBuilder.group({
      password: ['password123', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['password123', [Validators.required, Validators.minLength(8)]],
    }, {
      validator: service.confirmPasswordValidator('password', 'confirmPassword'),
    });

    expect(formGroup.valid).toBeTruthy();
  });

  it('should create a form group with non-matching passwords and set confirmPasswordValidator error', () => {
    const formGroup: FormGroup = formBuilder.group({
      password: ['password123', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['differentpassword', [Validators.required, Validators.minLength(8)]],
    }, {
      validator: service.confirmPasswordValidator('password', 'confirmPassword'),
    });

    expect(formGroup.valid).toBeFalsy();
  });

  it('should create a form group without touching confirmPassword control if it has errors', () => {
    const formGroup: FormGroup = formBuilder.group({
      password: ['password123', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['differentpassword', [Validators.required, Validators.minLength(8)]],
    }, {
      validator: service.confirmPasswordValidator('password', 'confirmPassword'),
    });
    expect(formGroup.valid).toBeFalsy();
    });

    it('should display a warning alert', () => {
      spyOn(Swal, 'fire');
      const warningMessage = { message: 'Your warning message' };
      service.sweetAlertInfoMessage(warningMessage);
      expect(Swal.fire).toHaveBeenCalledWith('Warning!', 'Your warning message', 'warning');
    });

    it('should display an error alert', () => {
      spyOn(Swal, 'fire');
      const errorMessage = { error: { error: { message: 'Your error message' } } };
      service.sweetAlertErrorMessage(errorMessage);
      expect(Swal.fire).toHaveBeenCalledWith('Opps!', 'Your error message', 'error');
    });

    it('should display an error alert with a custom URL', () => {
      spyOn(Swal, 'fire');
      const errorMessage = { error: { error: { message: 'Your error message' } } };
      const customUrl = 'https://example.com';
      service.sweetAlertErrorMessage(errorMessage, customUrl);
      expect(Swal.fire).toHaveBeenCalledWith('Opps!', 'Your error message', 'error');
    });
});
