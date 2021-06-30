import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SidebarModule} from 'ng-sidebar'
import {  MatIconModule } from '@angular/material';
import { SharedModule } from './shared/shared.module';
import { TreeComponent } from './tree-of-steps/tree/tree.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigurationSearchBoxHomeComponent } from './configuration/configuration-search-box-home/configuration-search-box-home.component';

@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    ConfigurationSearchBoxHomeComponent
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
