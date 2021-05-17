import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationStepsHomeComponent } from './configuration-steps-home/configuration-steps-home.component';

import { TitleActiveRulesComponent } from './title-active-rules/title-active-rules.component';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { RulesModule } from './rules/rules.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ConfigurationStepsHomeComponent,TitleActiveRulesComponent],
  imports: [
    CommonModule,
    RulesModule,
    ConfigurationRoutingModule,
    SharedModule
  ],
  exports: [
    SharedModule,
  ]
})
export class ConfigurationModule { }
