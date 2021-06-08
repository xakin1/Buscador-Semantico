import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { SharedModule } from '../shared.module';
import { InfoComponent } from './info/info.component';
import { LabelsComponent } from './labels/labels.component';
import { SliderComponent } from './slider/slider.component';
import { DdComponent } from './dd/dd.component';
import { MatAutocompleteModule, MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatRadioModule, MatSliderModule, MatStepperModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [InfoComponent, LabelsComponent, SliderComponent, DdComponent],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
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
    MatAutocompleteModule,
    FormsModule,
    CommonModule
  ],
  exports: [InfoComponent, LabelsComponent, SliderComponent, DdComponent,
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
    MatAutocompleteModule,
    FormsModule,
    CommonModule],

  entryComponents: [InfoComponent]
})
export class ComponentsModule { }
