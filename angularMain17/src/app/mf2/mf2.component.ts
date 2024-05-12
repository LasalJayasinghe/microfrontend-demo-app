import { Component, ViewEncapsulation } from '@angular/core';
import { WebComponentWrapperOptions } from '@angular-architects/module-federation-tools';
import { ModuleFederationToolsModule } from '@angular-architects/module-federation-tools';


@Component({
  selector: 'app-mf2',
  templateUrl: './mf2.component.html',
  styleUrl: './mf2.component.css',
  encapsulation: ViewEncapsulation.ShadowDom

})
export class Mf2Component {

  angularComponent: WebComponentWrapperOptions = {
    remoteEntry: 'http://localhost:5004/remoteEntry.js',
    type: 'module',
    exposedModule: './web-components',
    elementName: 'angular17-element'
  }

  props = {

  }
}
