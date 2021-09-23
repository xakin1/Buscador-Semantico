import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-config',
  templateUrl: './bar-config.component.html',
  styleUrls: ['./bar-config.component.scss']
})
export class BarConfigComponent implements OnInit {

  @Input() step   : any[][]
  @Input() row    : number
  @Input() column : number

  maxResultados:number = 500;

  constructor() { }

  ngOnInit() {
  }

  changeAnchoBuscador(value){
    this.step[this.column][this.row].searchBox.anchoBusqueda = value
  }

  changeAltoBuscador(value){
    this.step[this.column][this.row].searchBox.altoBusqueda = value
  }

  changeAnchoResultado(value){
    this.step[this.column][this.row].searchBox.anchoBarra = value
  }

  changeAltoResultado(value){
    this.step[this.column][this.row].searchBox.altoBarra = value
  }

  changePlaceHolder(){
    if((<HTMLInputElement>document.getElementById("placeholder")) != undefined){
      let placeholder = (<HTMLInputElement>document.getElementById("placeholder")).value;
      this.step[this.column][this.row].searchBox.placeHolder = placeholder
    }
  }
}
