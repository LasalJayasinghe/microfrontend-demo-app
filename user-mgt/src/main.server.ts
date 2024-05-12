import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Dynamically import bootstrap module
import('./bootstrap')
  .then(() => {
    // Once the bootstrap module is loaded, bootstrap the AppModule
    platformBrowserDynamic().bootstrapModule(AppModule)
      .catch(err => console.error(err));
  })
  .catch(err => console.error(err));
const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
