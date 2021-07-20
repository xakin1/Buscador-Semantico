import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Step } from '../components.module';

@Component({
  selector: 'app-combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.scss']
})
export class ComboBoxComponent  {
  selectedValue: string;
  selectedCar: string;
  @Input('data') steps: Step[];
  @Input('id') id: string;
  @Output() changed = new EventEmitter<any>();
  selected : number



  selectedItem;

  onChange(step){
    if( step != "") this.changed.emit(step != undefined ? step.id : undefined);
  }
}
