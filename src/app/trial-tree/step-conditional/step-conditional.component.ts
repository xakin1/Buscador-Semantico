import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { TrialTreeComponent } from '../trial-tree.component';

@Component({
  selector: 'app-step-conditional',
  templateUrl: './step-conditional.component.html',
  styleUrls: ['./step-conditional.component.scss']
})
export class StepConditionalComponent implements OnInit {
  @Input("right") right: boolean = false;
  @Input("left") left: boolean = false;
  @Output() open = new EventEmitter<any>();
  @Input("numberOfLefts") nol = 0;
  @Input("numberOfRights") nor = 0;
  positionLeft = 5.2;
  positionRight = 43.6;
  childNol = 1;
  childNor = 1;
  position:string;
  @Output() edit = new EventEmitter<any>();

  public unique_key: number = 0;
  public parentRef: TrialTreeComponent;

  constructor(public viewContainerRef:ViewContainerRef) { }

  getPositionLeft(){
    if(this.nol == 0 )
      return this.positionLeft = 25
    else
      return this.positionLeft;
  }

  getPositionRight(){
    if(this.nor == 0 )
      return this.positionRight = 25
    else
      return this.positionRight;
  }

  openSideBar(position){
    this.open.emit(position);
  }

  ngOnInit() {
  }

  editStep(){
    this.edit.emit(this.unique_key);
  }

}
