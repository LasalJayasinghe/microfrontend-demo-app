import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
    {
      path: 'mf1', // Parent path
      children: [
        {
          path: 'search', // Child path
          component: SearchComponent
        },
        {
          path: '', 
          component: AppComponent
        }
      ]
    },
    { 
      path: '', // Default route if no path is specified
      redirectTo: '/mf1', // Redirect to mf1 by default
      pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
