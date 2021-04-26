import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationStepsHomeComponent } from './configuration-steps-home/configuration-steps-home.component';
import { LabelsComponent } from './steps-components/labels/labels.component';
import { StepsComponentsModule } from './steps-components/steps-components.module';
import { InputTextComponent } from './steps-components/input-text/input-text.component';

import {
  MatButtonModule,
  MatIconModule,
  MatRadioModule,
  MatStepperModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import { InputsHomeComponent } from './configuration-steps-home/inputs-home/inputs-home.component';

@NgModule({
  exports: [
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatStepperModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  declarations: []
})
export class MaterialModule {}


@NgModule({
  declarations: [ConfigurationStepsHomeComponent,LabelsComponent,InputTextComponent,InputsHomeComponent],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    StepsComponentsModule,
    MaterialModule
  ],
  exports: [
    MaterialModule
  ]
})
export class ConfigurationModule { }
