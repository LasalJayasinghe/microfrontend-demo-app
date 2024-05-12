import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../service/secure/auth.service";
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
import {TokenService} from "../../../service/secure/token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  showPassword: boolean = false;
  isLoggedIn = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService) {
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    if (this.tokenService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.router.navigate([this.authService.getInitialRoute()]).then();
    }
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      // recaptcha: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      delete this.loginForm.value.recaptcha;
      this.authService.proceedLogin(this.loginForm.value).subscribe({
        next: this.handleSubmitResp.bind(this),
        error: this.handleError.bind(this)
      });
    }
  }

  handleSubmitResp(resp: any) {
    this.submitted = false;
    if (resp) {
      this.router.navigate([this.authService.getInitialRoute()]).then();
    }
  }

  handleError(error: any) {
    this.submitted = false;
    Swal.fire(
      'Opps!',
      error.error.error.message,
      'error'
    ).then();
  }
}
