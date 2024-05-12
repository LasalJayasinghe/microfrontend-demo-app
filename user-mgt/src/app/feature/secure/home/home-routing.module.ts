import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";

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
    component: DashboardComponent,
  },
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
