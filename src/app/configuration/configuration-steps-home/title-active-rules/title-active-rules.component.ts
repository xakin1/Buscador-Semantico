import { Component, Input, ViewChild } from '@angular/core';
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

  @ViewChild(LabelsComponent,{static: false}) listOfTitles: any;

  @Input('titleList') titleList;

  ngOnInit() {
    if(this.listOfTitles != undefined)
      this.titleList = this.listOfTitles.labels;
 }
}
