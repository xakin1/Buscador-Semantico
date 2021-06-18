import { Component, Input, OnInit } from '@angular/core';

interface Stept{
  title: string;
}

@Component({
  selector: 'app-combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.scss']
})
export class ComboBoxComponent  {
  selectedValue: string;
  selectedCar: string;
  @Input('data') data: Stept[];

}
