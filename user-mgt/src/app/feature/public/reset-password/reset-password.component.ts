import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilService} from "../../../service/public/util.service";
import {Router} from "@angular/router";
import {TokenService} from "../../../service/secure/token.service";
import Swal from "sweetalert2";
import {ROUTE_LOGIN} from "../../../shared/constants/auth.const";
import {AuthService} from "../../../service/secure/auth.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPwForm!: FormGroup;
  submitted: boolean = false;
  showPassword: boolean = false;
  showConPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private utilsService: UtilService,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.tokenService.removeAllSessionsData();
    this.initResetPwForm();
    this.checkTokenIsValid(this.router.url.split('/').pop());
  }

  checkTokenIsValid(token: any) {
    const payLoad = {
      verificationCode: token
    }

    this.authService.verifyToken(payLoad).subscribe({
      error: this.handleError.bind(this)
    });
  }

  handleError(error: any) {
    Swal.fire({
      title: 'Opps...',
      text: "The reset link is no longer valid. It has already been used to reset your password or it has expired. Click here to request a new link.",
      icon: 'error',
      confirmButtonText: 'Reset again'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['reset']).then();
      }
    })
  }

  get f() {
    return this.resetPwForm.controls;
  }

  initResetPwForm() {
    this.resetPwForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(12)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(12)]],
    }, {
      validator: this.utilsService.confirmPasswordValidator('password', 'confirmPassword')
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.resetPwForm.valid) {
      this.spinnerService.show().then();
      this.resetPwForm.value.verificationCode = this.router.url.split('/').pop();
      delete this.resetPwForm.value.confirmPassword;
      this.authService.submitNewPassword(this.resetPwForm.value).subscribe({
        next: this.handleNewPasswordResp.bind(this),
        error: this.handleNewPasswordError.bind(this)
      });
    }
  }

  handleNewPasswordResp(data: any) {
    this.spinnerService.hide();
    this.utilsService.sweetAlertSuccessMessage(data, ROUTE_LOGIN)
    this.submitted = false;
  }

  handleNewPasswordError(error: any) {
    this.spinnerService.hide();
    this.utilsService.sweetAlertErrorMessage(error)
    this.submitted = false;
  }
}
