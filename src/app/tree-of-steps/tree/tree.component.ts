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

  row   : number  = 0;
  column: number  = 0;

  infoKeywords: string  = "Hacer click en una etiqueta para desplegar el diccionario de datos"
  info        : string  = "Regla que, junto las palabras claves, ayudarán a identificar el producto";
  title       : string  = "Palabras clave que definan al producto";
  placeholder : string  = "Nueva palabra clave...";


  infoSynonym : string  = "Lista de sinónimos que permitirá de igual manera identificar el paso correspondiente";
  titleSynonym: string  = "Listado de sinónimo";
  widthSynonym: number  = 100;

  placeholderSynonym: string  = "Nuevo sinónimo...";
  child_unique_key   : number = -1;

  step: any;
  steps: any = [];

  @ViewChild("viewContainer", { read: ViewContainerRef, static : false }) VCR: ViewContainerRef

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  saveNameStep() {
    if((<HTMLInputElement>document.getElementById("Title")) != undefined){
        let name = (<HTMLInputElement>document.getElementById("Title")).value;
        this.step[this.column][this.row].name = name;
        this.steps[ this.step[this.column][this.row].unique_key ].name = name;
    }
  }

  saveCondition(i) {
    if((<HTMLInputElement>document.getElementById("Condicion " + i)) != undefined){
      let label = (<HTMLInputElement>document.getElementById("Condicion " + i)).value;

      if(this.step[this.column][this.row].conditions[i] == undefined ) this.createNextStep(label);
      else this.changeLabelOfLine(i, label)

      this.step[this.column][this.row].conditions[i] = label;
    }
  }

  newCondition(){
    this.step[this.column][this.row].conditions.push(undefined);
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

      if(<HTMLInputElement>document.getElementById("Title") != undefined)
        (<HTMLInputElement>document.getElementById("Title")).value = this.step[this.column][this.row].name
    });

    this.toggleSidebar();

    childComponent.columns.push([{id: this.column+" "+this.row , name: "Title of Step", haveNext: false, conditions: [],dd: [],keywords: [], synonym: [], line: [], unique_key: ++this.child_unique_key}])
    this.steps.push({id: this.column+" "+this.row , name: "Title of Step"});

    this.step = childComponent.columns;
  }

  drawNextStep(id){

    setTimeout(()=>{
      let startElement = (<HTMLInputElement>document.getElementById(this.column +" "+this.row));
      let endElement = (<HTMLInputElement>document.getElementById(id))
      if(startElement == endElement){
        endElement =  (<HTMLInputElement>document.getElementById("self " + id))

        let line = new LeaderLine({
          start: startElement,
          end: endElement,
          path: "magnet"
          });

        this.step[this.column][this.row].line.push(line)
      }
      else this.drawLine(startElement,endElement,'');
    })

  }

  drawLine(startElement, endElement, label){
    let line;
    if(label != ''){
        line = new LeaderLine({
        start: startElement ,
        end: endElement,
        endLabel: label,
        path: "magnet"
      })
    }
    else{
        line = new LeaderLine({
        start: startElement,
        end: endElement,
        path: "magnet"
        });
    }
    this.step[this.column][this.row].line.push(line)
  }

  changeLabelOfLine(i,label){
    this.step[this.column][this.row].line[i].setOptions({
      endLabel: label
    })
  }

  createColumn(label){
    this.step[this.column][this.row].haveNext = true

    this.step.push([{id: this.step.length +" 0", name: 'Title of Step', haveNext: false, conditions: [],dd: [],keywords: [], synonym: [], line: [], unique_key: ++this.child_unique_key}]);
    this.steps.push({id: this.step.length +" 0", name: 'Title of Step'})

    setTimeout(()=>{
      let startElement = (<HTMLInputElement>document.getElementById(this.column +" "+this.row));
      let endElement = (<HTMLInputElement>document.getElementById(this.step.length-1  +" 0"))
      this.drawLine(startElement,endElement,label );
    })

    this.toggleSidebar();
  }

  createStepInColumn(label) {
    this.step[this.column+1].push({id:( this.step.length -1) +" "+this.step[this.column+1].length, name: 'Title of Step', haveNext: false, conditions: [],dd: [],keywords: [], synonym: [], line: [], unique_key: ++this.child_unique_key})
    this.steps.push({id: this.step.length +" 0", name: 'Title of Step'})

    setTimeout(()=>{
      let startElement = (<HTMLInputElement>document.getElementById(this.column+" "+this.row));
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
