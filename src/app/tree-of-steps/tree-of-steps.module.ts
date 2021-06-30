import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeOfStepsRoutingModule } from './tree-of-steps-routing.module';
import { StepsComponent } from './steps/steps.component';
import { SharedModule } from '../shared/shared.module';
import { TreeComponent } from './tree/tree.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [StepsComponent ],
  imports: [
    TreeOfStepsRoutingModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class TreeOfStepsModule { }
