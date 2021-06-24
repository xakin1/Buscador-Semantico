import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeOfStepsRoutingModule } from './tree-of-steps-routing.module';
import { StepsComponent } from './steps/steps.component';
import { SharedModule } from '../shared/shared.module';
import { TreeComponent } from './tree/tree.component';


@NgModule({
  declarations: [StepsComponent, TreeComponent],
  imports: [
    CommonModule,
    TreeOfStepsRoutingModule,
    SharedModule
  ]
})
export class TreeOfStepsModule { }
