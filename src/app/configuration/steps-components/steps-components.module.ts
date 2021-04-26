import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepsComponentsRoutingModule } from './steps-components-routing.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { LabelsComponent } from './labels/labels.component';
import { InputTextComponent } from './input-text/input-text.component';
import { MatStepperModule, MatToolbar } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StepsComponentsRoutingModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule,
    MatStepperModule,
    ReactiveFormsModule

  ],
  exports: [
    MatChipsModule,
    MatInputModule,
    MatIconModule,
    MatStepperModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  entryComponents: [LabelsComponent,InputTextComponent]

})

export class StepsComponentsModule { }
