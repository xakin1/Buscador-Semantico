import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ConfigurationRoutingModule } from './configuration-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigurationSearchBoxHomeComponent } from './configuration-search-box-home/configuration-search-box-home.component';
import { TreeComponent } from './tree/tree.component';

@NgModule({
  declarations: [TreeComponent, ConfigurationSearchBoxHomeComponent],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class ConfigurationModule { }
