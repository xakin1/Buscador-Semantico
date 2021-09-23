import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-diccionario-de-datos',
  templateUrl: './diccionario-de-datos.component.html',
  styleUrls: ['./diccionario-de-datos.component.scss']
})
export class DiccionarioDeDatosComponent implements OnInit {

  @Input() step   : any[][]
  @Input() row    : number
  @Input() column : number

  infoKeywords: string  = "Hacer click en una etiqueta para desplegar el diccionario de datos"
  title       : string  = "Palabras clave que definan al producto";
  placeholder : string  = "Nueva palabra clave..."
  infodd: string  = "Esto será de gran ayuda";
  titledd: string  = "Listado de Palabras clave";
  widthSynonym: number  = 100;
  placeholderdd : string  = "Nuevo termino...";


  constructor() { }

  ngOnInit() {
  }

  addDd(){
    this.step[this.column][this.row].dd.push([])
  }

  updateDd(event){
    if ((<HTMLInputElement>document.getElementById("dd")) != undefined){
      if((<HTMLInputElement>document.getElementById("dd")).value != undefined)
        this.step[this.column][this.row].dd[event.oldIndex] = ((<HTMLInputElement>document.getElementById("dd")).value.split(','));
        (<HTMLInputElement>document.getElementById("dd")).value =this.step[this.column][this.row].dd[event.newIndex].join()
    }
  }


  remove(index){
    if (index >= 0) {
      this.step[this.column][this.row].dd.splice(index, 1);
      (<HTMLInputElement>document.getElementById("dd")).value =this.step[this.column][this.row].dd[index].join()
    }
  }

}
