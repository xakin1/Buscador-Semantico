import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dd',
  templateUrl: './dd.component.html',
  styleUrls: ['./dd.component.scss']
})
export class DdComponent implements OnInit {

  constructor() { }
  @ViewChild('dd',{static: false}) dd : any;
  @Input('value') valueOfDd: string;
  @Input('readOnly') readOnly: boolean = false

  ngOnInit() {
  }

  getText(){
    return (<HTMLInputElement>document.getElementById("dd")).value;
  }

  setText(value: string){
    (<HTMLInputElement>document.getElementById("dd")).value = value;
  }
}
