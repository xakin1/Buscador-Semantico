import { ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { StepBoxComponent } from 'src/app/shared/components/step-box/step-box.component';
import 'leader-line';
declare let LeaderLine: any;

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})

export class TreeComponent implements OnInit {
  open: boolean = true;
  edit: boolean = false;
  condicionalfalse = "condicional false"
  condicionaltrue  = "condicional true"
  condicional  = "condicional"
  child_unique_key: number = -1;
  row: number = 0;
  column: number = 0;

  infoKeywords: string = "Hacer click en una etiqueta para desplegar el diccionario de datos"
  info : string = "Regla que, junto las palabras claves, ayudarán a identificar el producto";
  errorName: boolean = false;
  title: string = "Palabras clave que definan al producto";
  placeholder: string = "Nueva palabra clave...";


  infoSynonym: string = "Lista de sinónimos que permitirá de igual manera identificar el paso correspondiente";
  titleSynonym: string = "Listado de sinónimo";
  placeholderSynonym: string = "Nuevo sinónimo...";
  widthSynonym: number = 100;
  conditionOfselectedStep = [];
  step: any;

  @ViewChild("viewContainer", { read: ViewContainerRef, static : false }) VCR: ViewContainerRef

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  saveNameStep() {
    if((<HTMLInputElement>document.getElementById("Title")) != undefined){
        this.step[this.column][this.row].name = (<HTMLInputElement>document.getElementById("Title")).value;
    }
  }

  saveCondition(i) {
    if((<HTMLInputElement>document.getElementById("Condicion " + i)) != undefined){
        this.createNextStep((<HTMLInputElement>document.getElementById("Condicion " + i)).value);
        if( this.step[this.column][this.row].conditions[i] != undefined )  this.step[this.column][this.row].conditions[i] = (<HTMLInputElement>document.getElementById("Condicion " + i)).value;
        else this.step[this.column][this.row].conditions.push((<HTMLInputElement>document.getElementById("Condicion " + i)).value);
    }
  }

  newCondition(){
    this.step[this.column][this.row].conditions.push('');
  }

  toggleSidebar(){
    this.open = false;
    this.saveNameStep();
  }

  createStep(){
    let componentFactory = this.resolver.resolveComponentFactory(StepBoxComponent);

    let childComponentRef  = this.VCR.createComponent(componentFactory);
    let childComponent     = childComponentRef.instance;

    childComponent.edit.subscribe(($event) => {
      this.edit = true;
      this.open = true;
      this.row = $event.row;
      this.column = $event.column;

      //TODO: REVISAR
      if(this.step[this.column][this.row] != undefined) this.conditionOfselectedStep = this.step[this.column][this.row].conditions;
      else this.conditionOfselectedStep = [];
      if(<HTMLInputElement>document.getElementById("Title") != undefined)
        (<HTMLInputElement>document.getElementById("Title")).value = this.step[this.column][this.row].name
    });

    this.toggleSidebar();

    childComponent.columns.push([{id: this.column+" "+this.row , name: "Title of Step", haveNext: false, conditions: [],dd: [],keywords: [], synonym: [] }])
    this.step = childComponent.columns;
  }

  drawLine(startElement, endElement, label){
    if(label != ''){
        new LeaderLine({
        start: startElement ,
        end: endElement,
        endLabel: label
      })
    }
    else{
        new LeaderLine({
        start: startElement,
        end: endElement
        });
    }
  }

  createColumn(label){
    this.step[this.column][this.row].haveNext = true

    this.step.push([{id: this.step.length +" 0", name: 'Title of Step', haveNext: false, conditions: [],dd: [],keywords: [], synonym: []}]);

    setTimeout(()=>{
      let startElement = (<HTMLInputElement>document.getElementById(this.column +" "+this.row));
      let endElement = (<HTMLInputElement>document.getElementById(this.step.length-1  +" 0"))
      this.drawLine(startElement,endElement,label );
    })

    this.toggleSidebar();
  }

  createStepInColumn(label) {

    this.step[this.column+1].push({id:( this.step.length -1) +" "+this.step[this.column+1].length, name: 'Title of Step', haveNext: false, conditions: [],dd: [],keywords: [], synonym: []})

    setTimeout(()=>{
      console.log("start "+ this.column +" "+this.row)
      let startElement = (<HTMLInputElement>document.getElementById(this.column+" "+this.row));
      console.log("end "+ (this.step.length-1)+" "+ (this.step[this.column+1].length - 1))
      let endElement = (<HTMLInputElement>document.getElementById(this.step.length-1+" "+ (this.step[this.column+1].length-1)))
      this.drawLine(startElement,endElement,label);
    })

    this.toggleSidebar();
  }

  createNextStep(label){
    if(this.step[this.column+1] == undefined) this.createColumn(label)
    else this.createStepInColumn(label)
  }

}
