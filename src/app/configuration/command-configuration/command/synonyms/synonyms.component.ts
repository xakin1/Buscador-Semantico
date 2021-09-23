import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-synonyms',
  templateUrl: './synonyms.component.html',
  styleUrls: ['./synonyms.component.scss']
})
export class SynonymsComponent implements OnInit {

  infoSynonym : string  = "Lista de sinónimos que permitirá de igual manera identificar el paso correspondiente";
  titleSynonym: string  = "Listado de sinónimo";
  widthSynonym: number  = 100;
  placeholderSynonym : string  = "Nuevo sinónimo...";



  @Input() comand   : any[]
  @Input() position : number

  constructor() { }

  ngOnInit() {
  }

}
