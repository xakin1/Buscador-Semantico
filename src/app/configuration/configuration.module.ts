import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ConfigurationRoutingModule } from './configuration-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
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
