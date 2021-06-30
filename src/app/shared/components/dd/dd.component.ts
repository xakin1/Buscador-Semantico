import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dd',
  templateUrl: './dd.component.html',
  styleUrls: ['./dd.component.scss']
})
export class DdComponent implements OnInit {

  constructor() { }
  @Input('value') valueOfDd;
  @Input('readOnly') readOnly: boolean = false

  ngOnInit() {
  }
}
