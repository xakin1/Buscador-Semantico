import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SliderComponent } from './slider/slider.component';
import { DdComponent } from './dd/dd.component';
import { MatAutocompleteModule, MatButtonModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatList, MatListModule, MatRadioModule, MatSelect, MatSelectModule, MatSliderModule, MatStepperModule, MatToolbarModule, MatTooltipModule, MatTreeModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoComponent } from './info/info.component';
import { LabelsComponent } from './labels/labels.component';
import { ComponentsRoutingModule } from './components-routing.module';
import { ComboBoxComponent } from './combo-box/combo-box.component';
import { EndComponent } from './end/end.component';
import { TrueComponent } from './true/true.component';
import { StepBoxComponent } from './step-box/step-box.component';
import { SidebarModule } from 'ng-sidebar';
import { StepBoxRightComponent } from './step-box-right/step-box-right.component';
import { ColumnComponent } from './column/column.component';
import { DefaultComponent } from './default/default.component';
import { ComboBoxIdiomaComponent } from './combo-box-idioma/combo-box-idioma.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PlusAddComponent } from './plus-add/plus-add.component';
import { NavbarComponent } from './navbar/navbar.component';


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

export interface searchBox{
  placeHolder   : any,
  anchoBarra    : any,
  altoBarra     : any,
  altoBusqueda  : any,
  anchoBusqueda : any,
  show          : boolean;
  keywords      : any[];
  dd            : any[];
}

export interface Step{
  id            : string,
  idBd          : any,
  name          : string,
  description   : string,
  end           : boolean,
  deleted       : boolean,
  synonym       : any[],
  keywords      : any[],
  dd            : any[],
  conditions    : any[],
  nextStep      : NextStep[],
  backStep      : BackStep[],
  conditionIndex: ConditionIndex[],
  defaultIndex  : number,
  searchBox     : searchBox;
}


@NgModule({
  declarations: [InfoComponent, LabelsComponent, SliderComponent, DdComponent, ComboBoxComponent,EndComponent,
    TrueComponent, StepBoxComponent, StepBoxRightComponent, ColumnComponent, DefaultComponent, ComboBoxIdiomaComponent,
    SidebarComponent, PlusAddComponent, NavbarComponent],
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
    MatListModule,
    MatTreeModule,
    MatSliderModule,
    MatButtonModule,
    MatTreeModule,
    MatIconModule,
    SidebarModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [InfoComponent, LabelsComponent, SliderComponent, DdComponent, ComboBoxComponent,
    EndComponent, ComboBoxIdiomaComponent, TrueComponent, StepBoxComponent, StepBoxRightComponent,
    ColumnComponent, DefaultComponent, SidebarComponent,PlusAddComponent,  NavbarComponent,
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
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    SidebarModule,
    ReactiveFormsModule,
    CommonModule],

  entryComponents: [EndComponent, StepBoxComponent,StepBoxRightComponent, ColumnComponent]
})
export class ComponentsModule { }
