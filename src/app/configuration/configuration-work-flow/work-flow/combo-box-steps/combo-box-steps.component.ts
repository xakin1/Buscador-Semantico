import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-combo-box-steps',
  templateUrl: './combo-box-steps.component.html',
  styleUrls: ['./combo-box-steps.component.scss']
})
export class ComboBoxStepsComponent{
  selectedValue: string;
  selectedCar: string;
  @Input('data') steps: any[];
  @Input('id') id: string;
  @Output() changed = new EventEmitter<any>();
  selected : number


  constructor() { }

  selectedItem;

  onChange(step){
    if( step != "") this.changed.emit(step != undefined ? step.id : undefined);
  }
}
