import {Injectable} from '@angular/core';
import {FormGroup} from "@angular/forms";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  confirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      let control = formGroup.controls[controlName];
      let matchingControl = formGroup.controls[matchingControlName]
      if (matchingControl.errors) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({confirmPasswordValidator: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  sweetAlertSuccessMessage(data, url) {
    Swal.fire(
      'Hooray!',
      data.message,
      'success'
    ).then(() => {
      this.router.navigate([url]).then()
    });
  }

  sweetAlertErrorMessage(error, url = '') {
    Swal.fire(
      'Opps!',
      error.error.error.message,
      'error'
    );
  }

  sweetAlertInfoMessage(warning, url = '') {
    Swal.fire(
      'Warning!',
      warning.message,
      'warning'
    );
  }

  snackbarSuccessMessage(content, action, duration: number = 2000) {
    this.snackBar.open(content, action, {
      duration: duration,
      verticalPosition: "top",
      horizontalPosition: "right",
      panelClass: ['green-snackbar']
    });
  }

  snackbarErrorMessage(content, action, duration: number = 2000) {
    this.snackBar.open(content, action, {
      duration: duration,
      verticalPosition: "top",
      horizontalPosition: "right",
      panelClass: ['red-snackbar']
    });
  }

  snackbarInfoMessage(content, action, duration: number = 2000) {
    this.snackBar.open(content, action, {
      duration: duration,
      verticalPosition: "top",
      horizontalPosition: "right",
      panelClass: ['yellow-snackbar']
    });
  }
}
