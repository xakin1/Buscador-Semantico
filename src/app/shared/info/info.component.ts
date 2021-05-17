import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
    info: string;

  changeText: boolean
  constructor() {
    this.changeText = false
  }
  ngOnInit() {
  }

  setInfo( info: string){
    this.info = info;
  }

}
