import { NgModule, Injector } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import { createCustomElement } from '@angular/elements';

import {AppComponent} from './app.component';
import {FirstLetterPipe} from './util/firstLetter.pipe';
import {HeaderComponent} from './shared/components/header/header.component';
import {FooterComponent} from './shared/components/footer/footer.component';
import {SideMenuComponent} from './shared/components/side-menu/side-menu.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ForbiddenComponent} from './shared/components/forbidden/forbidden.component';
import {PublicComponent} from './shared/layouts/public/public.component';
import {SecureComponent} from './shared/layouts/secure/secure.component';
import {AppRoutingModule} from "./app.routes";
import {PublicModule} from "./feature/public/public.module";
import {MatMenuModule} from "@angular/material/menu";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCardModule} from "@angular/material/card";
import {ShortNamePipe} from './util/short-name.pipe';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptorService} from "./core/interceptors/auth-interceptor.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { UserManagementModule } from './feature/secure/user-management/user-management.module';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PublicModule,
    MatMenuModule,
    MatTooltipModule,
    MatCardModule,
    MatSnackBarModule,
    UserManagementModule
  ],
  declarations: [
    AppComponent,
    FirstLetterPipe,
    HeaderComponent,
    FooterComponent,
    SideMenuComponent,
    ForbiddenComponent,
    PublicComponent,
    SecureComponent,
    ShortNamePipe,
  ],
  exports: [
    FooterComponent
  ],
  bootstrap: [
    
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ]
})
export class AppModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const ce = createCustomElement(AppComponent, {injector: this.injector});
    customElements.define('angular17-element', ce);

  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
