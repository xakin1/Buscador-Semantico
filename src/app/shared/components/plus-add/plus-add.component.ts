import { EmitterVisitorContext } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-plus-add',
  templateUrl: './plus-add.component.html',
  styleUrls: ['./plus-add.component.scss']
})
export class PlusAddComponent implements OnInit {

  @Output() open = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  Onclick () {
    this.open.emit(true);
  }
}
