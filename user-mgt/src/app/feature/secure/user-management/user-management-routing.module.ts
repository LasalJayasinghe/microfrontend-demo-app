import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateUserComponent} from "./create-edit-user/create-edit-user.component";
import {CreatedUserComponent} from "./created-user/created-user.component";

const routes: Routes = [
  {
    path: '',
    // canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        // only: PERMISSIONS.subMenuViewUser,
        // redirectTo: ROUTE_FORBIDDEN
      }
    },
    component: CreatedUserComponent,
  },
  {
    path: 'create',
    // canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        // only: PERMISSIONS.subMenuViewUser,
        // redirectTo: ROUTE_FORBIDDEN
      }
    },
    component: CreateUserComponent,
  },
  {
    path: 'edit/:id',
    // canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        // only: PERMISSIONS.subMenuViewUser,
        // redirectTo: ROUTE_FORBIDDEN
      }
    },
    component: CreateUserComponent,
  },
  {path: '**', redirectTo: 'create', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
