import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationStepRoutingModule } from './configuration-step-routing.module';
import { StepComponent } from './step/step.component';
import { ConfigurationSynonymModule } from '../configuration-synonym/configuration-synonym.module';
import { ConfigurationWorkFlowModule } from '../configuration-work-flow/configuration-work-flow.module';


@NgModule({
  declarations: [
    StepComponent
  ],
  imports: [
    CommonModule,
    ConfigurationStepRoutingModule,
    ConfigurationWorkFlowModule,
    ConfigurationSynonymModule
  ]
})
export class ConfigurationStepModule { }
