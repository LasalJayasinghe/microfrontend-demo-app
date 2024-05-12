import { Component, Input } from '@angular/core';
import packageJson from '../../package.json';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ang17';
   ngVersion: string = packageJson.dependencies['@angular/core'];

   @Input() messages: string = 'Default text';

   constructor() { }


}
