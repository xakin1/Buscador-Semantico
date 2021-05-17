import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RulesRoutingModule } from './rules-routing.module';
import { RulesHomeComponent } from './rules-home/rules-home.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [RulesHomeComponent],
  imports: [
    CommonModule,
    RulesRoutingModule,
    SharedModule
  ],
  exports: [
    RulesHomeComponent
  ]
})
export class RulesModule { }
