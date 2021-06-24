import { Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { StepBoxRightComponent } from '../step-box-right/step-box-right.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {

  constructor(private resolver: ComponentFactoryResolver) { }
  public unique_key: number = 0;
  public haveNext = false;
  open: boolean = true;
  edited: boolean = false;
  index : number = 0;
  @Input("titleStep") titleStep = "Title of Step"

  steps: string[] = []
  @Output() edit = new EventEmitter<any>();

  ngOnInit() {
  }

  editStep(){
    this.edit.emit('');
  }


}
