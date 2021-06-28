import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { iif } from 'rxjs';



interface Stept{
  id: string
  name: string,
  haveNext: boolean,
  synonym: any[],
  keywords: any[],
  dd: any[],
  conditions: any[],
  line: any[];
}

@Component({
  selector: 'app-combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.scss']
})
export class ComboBoxComponent  {
  selectedValue: string;
  selectedCar: string;
  @Input('data') steps: Stept[];
  @Output() changed = new EventEmitter<any>();

  selectedItem;

  onChange(step){
    if( step != "") this.changed.emit(step.id)
  }


}
