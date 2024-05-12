import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
@Component({
  selector: 'app-angular',
  standalone: true,
  imports: [],
  templateUrl: './angular.component.html',
  styleUrl: './angular.component.css'
})
export class AngularComponent implements OnInit {
  @ViewChild('placeHolder', { read: ViewContainerRef })
  viewContainer!: ViewContainerRef;

  constructor() { }

  ngOnInit(): void {
    this.loadRemoteComponent();
  }

  async loadRemoteComponent(): Promise<void> {
    try {
      const m = await loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:5001/remoteEntry.js',
        exposedModule: './homeModule'
      });
      const ref = this.viewContainer.createComponent(m.HomeModule);
    } catch (error) {
      console.error('Error loading remote module:', error);
      // Handle the error as needed
    }
  }



}
