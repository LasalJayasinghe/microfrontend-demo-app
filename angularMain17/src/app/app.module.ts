import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ModuleFederationToolsModule } from '@angular-architects/module-federation-tools';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { MF1Component } from './mf1/mf1.component';
import { Mf2Component } from './mf2/mf2.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MF1Component,
    Mf2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModuleFederationToolsModule,
    NavbarComponent,
    FooterComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
