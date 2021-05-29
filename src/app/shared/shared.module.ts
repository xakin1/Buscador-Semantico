import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatRadioModule, MatStepperModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { InfoComponent } from './info/info.component';
import { LabelsComponent } from './labels/labels.component';


@NgModule({
  declarations: [InfoComponent,LabelsComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatStepperModule,
    MatToolbarModule,
    MatTooltipModule,
    MatRadioModule,
    MatChipsModule,
    MatFormFieldModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatStepperModule,
    MatToolbarModule,
    MatTooltipModule,
    MatRadioModule,
    MatChipsModule,
    MatFormFieldModule,
    InfoComponent,
    LabelsComponent
  ],
  entryComponents: [InfoComponent]
})
export class SharedModule { }
