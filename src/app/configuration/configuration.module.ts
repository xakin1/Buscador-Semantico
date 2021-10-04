import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material';
import { StepsConfigurationComponent } from './steps-configuration/steps-configuration.component';
import { CommandConfigurationModule } from './command-configuration/command-configuration.module';
import { SearchBoxModule } from './steps-configuration/search-box/search-box.module';
import { StepsModule } from './steps-configuration/steps/steps.module';
import { AdvanceOptionsComponentSteps } from './steps-configuration/steps/general/advance-options/advance-options.component';
import { AdvanceOptionsComponentCommand } from './command-configuration/command/advance-options/advance-options.component';
import { ConfigurationSearchBoxHomeComponent } from './configuration-search-box-home/configuration-search-box-home.component';



@NgModule({
  declarations: [StepsConfigurationComponent, ConfigurationSearchBoxHomeComponent],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    CommandConfigurationModule,
    SharedModule,
    StepsModule,
    SearchBoxModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  exports: [
    SharedModule,
    StepsModule,
    CommandConfigurationModule,
    SearchBoxModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  entryComponents: []
})
export class ConfigurationModule { }
