import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenService} from "../../../service/secure/token.service";
import {AuthService} from "../../../service/secure/auth.service";
import {ROUTE_LOGIN} from "../../../shared/constants/auth.const";
import {UtilService} from "../../../service/public/util.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPwForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private authService: AuthService,
    private utilsService: UtilService,
    private spinnerService: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.tokenService.removeAllSessionsData();
    this.initForgotPwForm();
  }

  get f() {
    return this.forgotPwForm.controls;
  }

  initForgotPwForm() {
    this.forgotPwForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }


  onSubmit() {
    this.submitted = true;
    if (this.forgotPwForm.value) {
      this.spinnerService.show();
      this.authService.resetPassword(this.forgotPwForm.value).subscribe({
        next: this.handleResetPasswordResp.bind(this),
        error: this.handleError.bind(this)
      });
    }
  }

  handleResetPasswordResp(data: any) {
    this.spinnerService.hide();
    this.utilsService.sweetAlertSuccessMessage(data, ROUTE_LOGIN)
    this.submitted = false;
  }

  handleError(error: any) {
    this.spinnerService.hide();
    this.utilsService.sweetAlertErrorMessage(error)
    this.submitted = false;
  }
}
