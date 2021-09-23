import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SidebarModule} from 'ng-sidebar'
import {  MatIconModule } from '@angular/material';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigurationModule } from './configuration/configuration.module';
import { LlamadasApiComponent } from './ApiCalls/llamadas-api/llamadas-api.component';


@NgModule({
  declarations: [
    AppComponent,
    LlamadasApiComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SidebarModule,
    SharedModule,
    MatIconModule,
    ConfigurationModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
