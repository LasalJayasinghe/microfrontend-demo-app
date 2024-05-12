import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebComponentWrapper, WebComponentWrapperOptions, startsWith } from '@angular-architects/module-federation-tools';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MF1Component } from './mf1/mf1.component';
import { Mf2Component } from './mf2/mf2.component';
import { Mf3Component } from './mf3/mf3.component';


const routes: Routes = [
  {
    path: 'mf1', // Parent path
    children: [
      {
        path:'',
        component : MF1Component
      },
    ]
  },
  {
    path: 'mf2', 
    children: [
      {
        path:'',
        component : Mf2Component
      },
    ]
  },
  {
    path:'mf3',
    component: Mf3Component
  },
  {
    path: '',
    component : DashboardComponent
}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
