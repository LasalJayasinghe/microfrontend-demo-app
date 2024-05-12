import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ForbiddenComponent} from "./shared/components/forbidden/forbidden.component";
import {PublicComponent} from "./shared/layouts/public/public.component";
import {SecureComponent} from "./shared/layouts/secure/secure.component";
import {AuthGuard} from "./core/guards/auth.guard";
import { UserProfileComponent } from "./feature/secure/user-management/user-profile/user-profile.component";
import { ChangePasswordComponent } from "./feature/secure/user-management/change-password/change-password.component";
import { loadRemoteModule } from "@angular-architects/module-federation";

export const routes: Routes = [
  {
    path: 'public',
    component: PublicComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./feature/public/public.module').then(
            (mod) => mod.PublicModule
          ),
      },
      {path: '', redirectTo: 'login', pathMatch: 'full'}
    ]
  },
  {
    path: 'secure',
    component: SecureComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'profile',
        // canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            // only: PERMISSIONS.subMenuViewUser,
            // redirectTo: ROUTE_FORBIDDEN
          }
        },
        component: UserProfileComponent,
      },
      {
        path: 'change-password',
        // canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            // only: PERMISSIONS.subMenuViewUser,
            // redirectTo: ROUTE_FORBIDDEN
          }
        },
        component: ChangePasswordComponent,
      },
      {
        path: 'user-management',
        // canLoad: [NgxPermissionsGuard],
        data: {
          permissions: {
            // only: PERMISSIONS.menuUserMgt,
            // redirectTo: ROUTE_FORBIDDEN
          }
        },
        loadChildren: () =>
          import('./feature/secure/user-management/user-management.module').then(
            (mod) => mod.UserManagementModule
          ),
      },
      {
        path: 'angular',
        loadChildren: () => loadRemoteModule({
          remoteEntry: 'http://localhost:5001/remoteEntry.js',
          type: 'module',
          exposedModule: './homeModule'
        })
        .then(m => m.HomeModule)
      },
      {
        path: 'dashboard',
        // canLoad: [NgxPermissionsGuard],
        data: {
          permissions: {
            // only: PERMISSIONS.menuDashboard,
            // redirectTo: ROUTE_FORBIDDEN
          }
        },
        loadChildren: () =>
          import('./feature/secure/home/home.module').then(
            (mod) => mod.HomeModule
          ),
      },
      {path: 'forbidden', component: ForbiddenComponent},
      {path: '', redirectTo: 'user-management', pathMatch: 'full'}
    ]
  },
  {path: '**', redirectTo: 'public/login', pathMatch: 'full'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
