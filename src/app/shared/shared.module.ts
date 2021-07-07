import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { ComponentsModule } from './components/components.module';


export interface LineConditions{
  true                  : any,
  false                 : any,
  indexFalse            : number,
  indexTrue             : number,
  columnNextStepTrue    : number,
  rowNextStepTrue       : number,
  columnNextStepFalse   : number,
  rowNextStepFalse      : number,
}

export interface NextStep{
  nextStepColumn  : number
  nextStepRow     : number
}

export interface Step{
  id            : string
  name          : string,
  haveNext      : boolean,
  end           : boolean,
  lineNextStep  : any,
  synonym       : any[],
  keywords      : any[],
  dd            : any[],
  conditions    : any[],
  lineConditions: LineConditions[],
  nextStep      : NextStep[],
  unique_key    : number,
  backStepColumn: number,
  backStepRow   : number,
  conditionBack : number;
}

@NgModule({
  declarations: [],
  imports: [
    SharedRoutingModule,
    ComponentsModule
  ],
  exports: [
    ComponentsModule
  ]
})
export class SharedModule { }
