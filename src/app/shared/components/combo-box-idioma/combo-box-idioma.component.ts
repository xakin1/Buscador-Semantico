import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-combo-box-idioma',
  templateUrl: './combo-box-idioma.component.html',
  styleUrls: ['./combo-box-idioma.component.scss']
})
export class ComboBoxIdiomaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  selectedValue: string;
  selectedCar: string;
  @Input('id') id: string;
  @Output() changed = new EventEmitter<any>();
  selected : number

  idiomas = ["es – Español","en – Inglés","pt – Portugués","gl – Galego","fr – Francés","it - Italiano"];

  selectedItem;

  onChange(lengua){
    this.changed.emit(lengua)
  }
}
