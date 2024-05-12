import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";

const routes: Routes = [
  {
    path: 'login',
    // canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        // only: PERMISSIONS.subMenuViewUser,
        // redirectTo: ROUTE_FORBIDDEN
      }
    },
    component: LoginComponent
  },
  {
    path: 'reset-password/:token',
    // canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        // only: PERMISSIONS.subMenuViewUser,
        // redirectTo: ROUTE_FORBIDDEN
      }
    },
    component: ResetPasswordComponent
  },
  {
    path: 'forgot-password',
    // canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        // only: PERMISSIONS.subMenuViewUser,
        // redirectTo: ROUTE_FORBIDDEN
      }
    },
    component: ForgotPasswordComponent
  },
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {
}
