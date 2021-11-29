import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationCommandRoutingModule } from './configuration-command-routing.module';
import { CommnandComponent } from './commnand/commnand.component';
import { ConfigurationSynonymModule } from '../configuration-synonym/configuration-synonym.module';
import { ConfigurationStepModule } from '../configuration-step/configuration-step.module';


@NgModule({
  declarations: [
    CommnandComponent
  ],
  imports: [
    CommonModule,
    ConfigurationSynonymModule,
    ConfigurationStepModule,
    ConfigurationCommandRoutingModule
  ]
})
export class ConfigurationCommandModule { }
