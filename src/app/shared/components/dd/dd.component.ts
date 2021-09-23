import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dd',
  templateUrl: './dd.component.html',
  styleUrls: ['./dd.component.scss']
})
export class DdComponent implements OnInit {

  constructor() { }
  @Input('value') valueOfDd;
  @Input('readOnly') readOnly: boolean = false
  @Output() saveDd = new EventEmitter<any>();

  ngOnInit() {
  }

  save(){
    this.saveDd.emit();
  }
}
