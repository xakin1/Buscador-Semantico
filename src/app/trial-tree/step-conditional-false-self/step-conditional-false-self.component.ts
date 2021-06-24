import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { TrialTreeComponent } from '../trial-tree.component';

@Component({
  selector: 'app-step-conditional-false-self',
  templateUrl: './step-conditional-false-self.component.html',
  styleUrls: ['./step-conditional-false-self.component.scss']
})
export class StepConditionalFalseSelfComponent implements OnInit {
  @Output() open = new EventEmitter<any>();

  @Input("right") right: boolean = false;
  @Input("left") left: boolean = false;
  public unique_key: number = 0;
  public parentRef: TrialTreeComponent;
  @Input("numberOfLefts") nol = 0;
  @Input("numberOfRights") nor = 0;
  childNol = 1;
  childNor = 1;
  positionLeft = 138;
  positionRight =  130.6;
  position:string;
  @Output() edit = new EventEmitter<any>();

  constructor(public viewContainerRef:ViewContainerRef) { }

  getPositionLeft(){
    if(this.nol == 0 )
      return this.positionLeft = 138;
    else{
      console.log("como no entre por aqui si que no entiendo nada nol"+ this.nol)
      // return this.nol <=1 ?  this.positionLeft + 320.6 * this.nol  : this.positionRight + (320.6 * (this.nol) - (27 * this.nol - 1));
      return this.positionLeft - 315.9 * this.nol;
    }
  }
  getPositionRight(){
    if(this.nor == 0 )
      return this.positionRight = 400
    else{
      return  this.nor <=1 ?  this.positionRight + 320.6 * this.nor : this.positionRight + 320.6 * this.nor - 27*(this.nor-1);
    }
  }

  openSideBar(){
    this.open.emit('left');
  }

  ngOnInit() {
  }

  editStep(){
    this.edit.emit(this.unique_key);
  }
}
