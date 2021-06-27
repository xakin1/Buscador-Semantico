import { C } from '@angular/cdk/keycodes';
import { Component, ComponentFactoryResolver, ComponentRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { ColumnComponent } from '../column/column.component';
import { StepBoxRightComponent } from '../step-box-right/step-box-right.component';


export interface Step{
  id: string
  name: string,
  haveNext: boolean,
  synonym: any[],
  keywords: any[],
  dd: any[],
  conditions: any[],
  line: any[],
  unique_key : number;
}

@Component({
  selector: 'app-step-box',
  templateUrl: './step-box.component.html',
  styleUrls: ['./step-box.component.scss']
})
export class StepBoxComponent implements OnInit {


  @Output() edit = new EventEmitter<any>();
  @Input("titleStep") titleStep = "Title of Step"
  constructor() { }
  public unique_key: number = 0;
  public haveNext = false;
  open: boolean = true;
  edited: boolean = false;
  index : number = 0;
  columns: Step[][] = []

  ngOnInit() {
  }

  editStep(row, column){
    this.edit.emit({row: row, column: column});
  }



}
