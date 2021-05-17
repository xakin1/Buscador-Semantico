import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  @Input('info') info: string = "Estamos Aquí para ayudarte";

  changeText: boolean
  constructor() {
    this.changeText = false
  }
  ngOnInit() {
    console.log(this.info)
  }

  setInfo( info: string){
    this.info = info;
  }

}
