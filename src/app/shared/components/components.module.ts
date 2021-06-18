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
import { EndComponent } from './end/end.component';
import { FalseComponent } from './false/false.component';
import { PlusComponent } from './plus/plus.component';
import { TrueComponent } from './true/true.component';
import { StepBoxComponent } from './step-box/step-box.component';
import { SidebarModule } from 'ng-sidebar';



@NgModule({
  declarations: [InfoComponent, LabelsComponent, SliderComponent, DdComponent, ComboBoxComponent,EndComponent, FalseComponent, PlusComponent, TrueComponent, StepBoxComponent],
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
    SidebarModule,
    FormsModule,
    CommonModule
  ],
  exports: [InfoComponent, LabelsComponent, SliderComponent, DdComponent, ComboBoxComponent, EndComponent, FalseComponent, PlusComponent, TrueComponent, StepBoxComponent,
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
    SidebarModule,
    CommonModule],

  entryComponents: [EndComponent,PlusComponent]
})
export class ComponentsModule { }
