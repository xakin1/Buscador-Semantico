import { Component, ComponentFactoryResolver, ComponentRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';

import { TrialTreeComponent } from '../trial-tree.component';

@Component({
  selector: 'app-step-plus',
  templateUrl: './step-plus.component.html',
  styleUrls: ['./step-plus.component.scss']
})
export class StepPlusComponent implements OnInit {
  @Output("open") open = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Input("singleStepBox") singleStepBox:boolean = false;
  @Input("titleStep") titleStep: string = "Title of step"
  @Input("right") right: boolean = false;
  @Input("left") left: boolean = false;
  @Input("numberOfLefts") nol = 0;
  @Input("numberOfRights") nor = 0;
  childNol = 0;
  childNor = 0;
  positionLeft = 450.4;
  positionRight = 469.4;
  position:string;
  public unique_key: number = 0;
  public parentRef: TrialTreeComponent;

  constructor(public viewContainerRef:ViewContainerRef) { }

  getPositionLeft(){
    if(this.nol == 0 )
      return this.positionLeft = 470
    else{
      return this.positionLeft - 295.6 * this.nol;
    }
  }

  getPositionRight(){
    if(this.nor == 0 )
      return this.positionRight = 450
    else{
      return  this.positionRight + 170.6 * this.nor ;
    }
  }

  ngOnInit() {
  }

  openSideBar(){
    this.open.emit(this.unique_key);
  }

  editStep(){
    this.edit.emit(this.unique_key);
  }
}
