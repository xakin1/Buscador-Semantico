import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatRadioModule, MatSliderModule, MatStepperModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { InfoComponent } from './components/info/info.component';
import { LabelsComponent } from './components/labels/labels.component';
import { SliderComponent } from './components/slider/slider.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [InfoComponent,LabelsComponent, SliderComponent],
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
    MatFormFieldModule,
    MatSliderModule,
    FormsModule
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
    MatSliderModule,
    InfoComponent,
    LabelsComponent,
    SliderComponent,
    FormsModule
  ],
  entryComponents: [InfoComponent]
})
export class SharedModule { }
