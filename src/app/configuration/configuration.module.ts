import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationStepsHomeComponent } from './configuration-steps-home/configuration-steps-home.component';
import { LabelsComponent } from './steps-components/labels/labels.component';
import { StepsComponentsModule } from './steps-components/steps-components.module';
import { InputTextComponent } from './steps-components/input-text/input-text.component';


@NgModule({
  declarations: [ConfigurationStepsHomeComponent,LabelsComponent,InputTextComponent],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    StepsComponentsModule
  ]
})
export class ConfigurationModule { }
