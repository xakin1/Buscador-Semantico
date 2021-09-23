import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-box-config',
  templateUrl: './search-box-config.component.html',
  styleUrls: ['./search-box-config.component.scss']
})
export class SearchBoxConfigComponent implements OnInit {

  @Input() step   : any[][]
  @Input() row    : number
  @Input() column : number

  infoKeywords: string  = "Hacer click en una etiqueta para desplegar el diccionario de datos"
  title       : string  = "Palabras clave que definan al producto";
  placeholder : string  = "Nueva palabra clave...";
  info        : string  = "Soy inútil por ahora"

  constructor() { }

  ngOnInit() {
  }

  updateDdSearchBox(event){
    if ((<HTMLInputElement>document.getElementById("dd")) != undefined){
      if((<HTMLInputElement>document.getElementById("dd")).value != undefined)
        this.step[this.column][this.row].searchBox.dd[event.oldIndex] = ((<HTMLInputElement>document.getElementById("dd")).value.split(','));
        (<HTMLInputElement>document.getElementById("dd")).value =this.step[this.column][this.row].searchBox.dd[event.newIndex].join()
    }
  }

  saveDdSearchBox(index){

    if ((<HTMLInputElement>document.getElementById("dd")) != undefined){
      if((<HTMLInputElement>document.getElementById("dd")).value != undefined)
        this.step[this.column][this.row].searchBox.dd[index] = ((<HTMLInputElement>document.getElementById("dd")).value.split(','));
    }
  }

  removeDdSearchBox(index){
    if (index >= 0) {
      this.step[this.column][this.row].dd.splice(index, 1);
      (<HTMLInputElement>document.getElementById("dd")).value = this.step[this.column][this.row].searchBox.keywords[index].join()
    }
  }

  addDdSearchBox(){
    this.step[this.column][this.row].searchBox.dd.push([])
  }

}
