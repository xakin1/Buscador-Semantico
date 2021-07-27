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
import { TrueComponent } from './true/true.component';
import { StepBoxComponent } from './step-box/step-box.component';
import { SidebarModule } from 'ng-sidebar';
import { StepBoxRightComponent } from './step-box-right/step-box-right.component';
import { ColumnComponent } from './column/column.component';
import { DefaultComponent } from './default/default.component';


export interface NextStep{
  column  : number,
  row     : number,
  line    : any;
}

export interface BackStep{
  column    : number,
  row       : number,
  condition : number;
}

export interface ConditionIndex{
  true          : number,
  conditionName : any;
}

export interface Step{
  id            : string
  name          : string,
  end           : boolean,
  deleted       : boolean,
  synonym       : any[],
  keywords      : any[],
  dd            : any[],
  conditions    : any[],
  nextStep      : NextStep[],
  backStep      : BackStep[],
  conditionIndex: ConditionIndex[];
  defaultIndex  : number;
}


@NgModule({
  declarations: [InfoComponent, LabelsComponent, SliderComponent, DdComponent, ComboBoxComponent,EndComponent, FalseComponent, TrueComponent, StepBoxComponent, StepBoxRightComponent, ColumnComponent, DefaultComponent],
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
  exports: [InfoComponent, LabelsComponent, SliderComponent, DdComponent, ComboBoxComponent, EndComponent, FalseComponent, TrueComponent, StepBoxComponent, StepBoxRightComponent, ColumnComponent, DefaultComponent,
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

  entryComponents: [EndComponent, StepBoxComponent,StepBoxRightComponent, ColumnComponent]
})
export class ComponentsModule { }
