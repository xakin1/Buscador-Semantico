import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SliderComponent } from './slider/slider.component';
import { DdComponent } from './dd/dd.component';
import { MatAutocompleteModule, MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatRadioModule, MatSelect, MatSelectModule, MatSliderModule, MatStepperModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { InfoComponent } from './info/info.component';
import { LabelsComponent } from './labels/labels.component';
import { ComponentsRoutingModule } from './components-routing.module';
import { ComboBoxComponent } from './combo-box/combo-box.component';



@NgModule({
  declarations: [InfoComponent, LabelsComponent, SliderComponent, DdComponent, ComboBoxComponent],
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
    MatSelectModule,
    FormsModule,
    CommonModule
  ],
  exports: [InfoComponent, LabelsComponent, SliderComponent, DdComponent, ComboBoxComponent,
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
    MatSelectModule,
    FormsModule,
    CommonModule],

  entryComponents: [InfoComponent]
})
export class ComponentsModule { }
