import { Component, OnInit, ViewChild } from '@angular/core';
import { LabelsComponent } from 'src/app/shared/labels/labels.component';

@Component({
  selector: 'app-rules-synonym-home',
  templateUrl: './rules-synonym-home.component.html',
  styleUrls: ['./rules-synonym-home.component.scss']
})
export class RulesSynonymHomeComponent implements OnInit {

  info: string = "Lista de sinónimos que permitirá de igual manera identificar el paso correspondiente";
  title: string = "Listado de sinónimo";
  placeholder: string = "Nuevo sinónimo...";
  width: number = 100;

  @ViewChild(LabelsComponent,{static: false}) listOfLabels:LabelsComponent;

  constructor() { }

  ngOnInit() {
  }

}
