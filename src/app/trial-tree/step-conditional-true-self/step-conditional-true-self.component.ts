import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { TrialTreeComponent } from '../trial-tree.component';

@Component({
  selector: 'app-step-conditional-true-self',
  templateUrl: './step-conditional-true-self.component.html',
  styleUrls: ['./step-conditional-true-self.component.scss']
})
export class StepConditionalTrueSelfComponent implements OnInit {
  @Output() open = new EventEmitter<any>();
  @Input("right") right: boolean = false;
  @Input("left") left: boolean = false;
  @Input("numberOfLefts") nol = 0;
  @Input("numberOfRights") nor = 0;
  childNol = 1;
  childNor = 1;
  positionLeft = 398.6;
  positionRight = 131.6;
  position:string;
  @Output() edit = new EventEmitter<any>();

  public unique_key: number = 0;
  public parentRef: TrialTreeComponent;

  constructor(public viewContainerRef:ViewContainerRef) { }

  getPositionLeft(){
    if(this.nol == 0 )
      return this.positionLeft =398.6
    else
      return this.positionLeft - 316 * this.nol;
  }

  getPositionRight(){
    if(this.nor == 0 )
      return this.positionRight = 398.6
    else{
      return this.nor <=1 ?  this.positionRight + 320.6 * this.nor : this.positionRight + 320.6 * this.nor - 27*(this.nor-1);
    }
  }

  openSideBar(){
    this.open.emit('right');
  }

  editStep(){
    this.edit.emit(this.unique_key);
  }

  ngOnInit() {
  }

}
