import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationWorkFlowRoutingModule } from './configuration-work-flow-routing.module';
import { WorkFlowComponent } from './work-flow/work-flow.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComboBoxStepsComponent } from './work-flow/combo-box-steps/combo-box-steps.component';


@NgModule({
  declarations: [
    WorkFlowComponent,
    ComboBoxStepsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConfigurationWorkFlowRoutingModule,
    SharedModule
  ],
  exports: []
})
export class ConfigurationWorkFlowModule { }
