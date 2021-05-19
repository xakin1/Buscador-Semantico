import { Component } from '@angular/core';

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
}
