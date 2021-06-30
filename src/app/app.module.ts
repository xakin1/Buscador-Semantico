import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SidebarModule} from 'ng-sidebar'
import {  MatIconModule } from '@angular/material';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigurationSearchBoxHomeComponent } from './configuration/configuration-search-box-home/configuration-search-box-home.component';
import { TreeComponent } from './configuration/tree/tree.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfigurationSearchBoxHomeComponent,
    TreeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SidebarModule,
    SharedModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
