import { Component, ViewEncapsulation } from '@angular/core';
import { WebComponentWrapperOptions } from '@angular-architects/module-federation-tools';


@Component({
  selector: 'app-dashboard',
  templateUrl: './mf1.component.html',
  styleUrl: './mf1.component.css',
  encapsulation: ViewEncapsulation.ShadowDom


})
export class MF1Component {
  title = 'MF1';
   
  angularComponent: WebComponentWrapperOptions = {
    remoteEntry: 'http://localhost:5003/remoteEntry.js',
    type: 'module',
    exposedModule: './web-components',
    elementName: 'angular3-a-element'
  }

  props = {
    config: {
      radioOptions: ['Male', 'Female', 'Others'],
      includeSearchBar: true,
      includeDateRange: true,
      dropdownOptions: ['Boston', 'New York', 'Miami' , 'California'],
      CheckboxValues: ['Boston', 'New York'],
    }
  };

}
