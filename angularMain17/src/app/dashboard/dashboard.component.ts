import { Component, ViewEncapsulation } from '@angular/core';
import { WebComponentWrapperOptions } from '@angular-architects/module-federation-tools';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  encapsulation: ViewEncapsulation.ShadowDom

})
export class DashboardComponent {
  title = 'angularMain';


}
