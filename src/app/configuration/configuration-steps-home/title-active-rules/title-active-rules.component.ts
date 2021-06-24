import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { LabelsComponent } from 'src/app/shared/components/labels/labels.component';

@Component({
  selector: 'app-title-active-rules',
  templateUrl: './title-active-rules.component.html',
  styleUrls: ['./title-active-rules.component.scss']
})
export class TitleActiveRulesComponent {
  info: string = "Comando o comandos que hacen que este conjunto de reglas se active";
  title: string = "Comandos que llaman a esta configuración";
  placeholder: string = "Nuevo comando...";
  width: number = 100;
  removable: boolean = true;
  @Output() added = new EventEmitter<string>();
  @Output() removed = new EventEmitter<string>();


  @ViewChild(LabelsComponent,{static: false}) listOfTitles: any;

  @Input('titleList') titleList;

  ngOnInit() {
    if(this.listOfTitles != undefined){
      this.titleList = this.listOfTitles.labels;

    }
 }

  lessThan(number1: number, number2: number){
   return number1<number2;
  }

  add(){
    this.added.emit('');
  }

  remove(){
    this.removed.emit('');
  }



}
