import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationStepsHomeComponent } from './configuration-steps-home/configuration-steps-home.component';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TitleActiveRulesComponent } from './configuration-steps-home/title-active-rules/title-active-rules.component';
import { RulesHomeComponent } from './configuration-steps-home/rules-home/rules-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigurationSearchBoxHomeComponent } from './configuration-search-box-home/configuration-search-box-home.component';

@NgModule({
  declarations: [ConfigurationStepsHomeComponent,TitleActiveRulesComponent,RulesHomeComponent, ConfigurationSearchBoxHomeComponent],
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
