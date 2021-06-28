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

  step      : any;
  steps     : any = [];
  tree      : any;
  condition : boolean = false;
  lastId    : string;

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

  saveCondition(i,id, condition) {
    this.condition = condition;
    if((<HTMLInputElement>document.getElementById("Condicion " + i)) != undefined){
      let label = (<HTMLInputElement>document.getElementById("Condicion " + i)).value;
      this.lastId = id;
      let lineCondition = this.condition ? this.step[this.column][this.row].lineConditions[i].true : this.step[this.column][this.row].lineConditions[i].false

        if(lineCondition == undefined ){
          this.step[this.column][this.row].end = false;
          if(this.step[this.column][this.row].lineNextStep != undefined) this.step[this.column][this.row].lineNextStep.remove()
          let endElement = (<HTMLInputElement>document.getElementById(id))
          if (endElement == undefined) this.createNextStep();

          setTimeout(()=>{
            let startElement = (<HTMLInputElement>document.getElementById(this.column +" "+this.row));
            let endElement = (<HTMLInputElement>document.getElementById(this.lastId))
            if(startElement == endElement) endElement =  (<HTMLInputElement>document.getElementById("self " + id))
            let line = drawConditionalLine(startElement,endElement,label,this.condition );
            this.condition ? this.step[this.column][this.row].lineConditions.push({true: line, false: undefined}) : this.step[this.column][this.row].lineConditions.push({true: undefined, false: false})
          })
        }
        else this.changeLabelOfLine(i, label)
        this.step[this.column][this.row].conditions[i] = label;
    }
  }

  newCondition(){
    this.step[this.column][this.row].conditions.push(undefined);
  }

  toggleSidebar(){
    this.open = false;
    this.tree.close();
    this.saveNameStep();
  }

  createEnd(){
    let startElement = (<HTMLInputElement>document.getElementById(this.column +" "+this.row));
    this.tree.end(this.column,this.row, startElement)
  }

  createStep(){
    let componentFactory = this.resolver.resolveComponentFactory(StepBoxComponent);
    let childComponentRef  = this.VCR.createComponent(componentFactory);
    let childComponent     = childComponentRef.instance;

    childComponent.edit.subscribe(($event) => {
      this.edit = true;
      this.open = true;
      childComponent.open = true
      this.row = $event.row;
      this.column = $event.column;

      if(<HTMLInputElement>document.getElementById("Title") != undefined)
        (<HTMLInputElement>document.getElementById("Title")).value = this.step[this.column][this.row].name
    });

    childComponent.columns.push([{id: this.column+" "+this.row , name: "Title of Step", haveNext: false, conditions: [],dd: [],keywords: [], synonym: [], lineConditions: [{true: undefined, false: undefined}],lineNextStep: undefined, unique_key: ++this.child_unique_key, end: false}])
    this.steps.push({id: this.column+" "+this.row , name: "Title of Step"});

    this.step = childComponent.columns;
    this.tree = childComponent;

    this.toggleSidebar();
  }

  drawNextStep(id){
    let startElement = (<HTMLInputElement>document.getElementById(this.column +" "+this.row));
    let endElement = (<HTMLInputElement>document.getElementById(id))

    if(this.step[this.column][this.row].lineNextStep != undefined) this.step[this.column][this.row].lineNextStep.remove()

    setTimeout(()=>{
      if(startElement == endElement){
        endElement =  (<HTMLInputElement>document.getElementById("self " + id))

        let line = drawSelfLine(startElement, endElement)
        this.step[this.column][this.row].lineNextStep = line
      }
      else {
        let line = drawStepLine(startElement,endElement);
        this.step[this.column][this.row].lineNextStep = line
      }
    })

  }

  changeLabelOfLine(i,label){
    this.step[this.column][this.row].lineConditions[i].setOptions({
      endLabel: label
    })
  }

  createColumn(){
    let id = this.step.length +" 0";
    let name = 'Title of Step'

    this.step[this.column][this.row].haveNext = true

    this.step.push([{id: id , name: name, haveNext: false, conditions: [],dd: [],keywords: [], synonym: [], lineConditions: [{true: undefined, false: undefined}], lineNextStep: undefined, unique_key: ++this.child_unique_key, end: false}]);
    this.steps.push({id: id, name:name })

    this.toggleSidebar();
    this.lastId = id;
  }

  createStepInColumn() {
    let id = ( this.step.length -1) +" "+this.step[this.column+1].length
    let name = 'Title of Step'
    this.step[this.column+1].push({id: id, name: name , haveNext: false, conditions: [],dd: [],keywords: [], synonym: [], lineConditions: [{true: undefined, false: undefined}], lineNextStep: undefined, unique_key: ++this.child_unique_key, end: false})
    this.steps.push({id: id, name: name})

    this.toggleSidebar();

    this.lastId = id;
  }

  createNextStep(){
    if(this.step[this.column+1] == undefined) this.createColumn()
    else this.createStepInColumn()
  }
}

function drawStepLine(startElement, endElement){
  let line = new LeaderLine({
      start: startElement,
      end: endElement,
      })

  return line
}

function drawSelfLine(startElement, endElement){
  let line = new LeaderLine({
    start: startElement,
    end: endElement,
    path: "magnet"
    });

  return line
}

function drawConditionalLine(startElement, endElement,label,condition){
  let line;
  if(condition){
    line = new LeaderLine({
      start: startElement ,
      end: endElement,
      endLabel: label,
      color: 'rgb(110, 224, 181)'
    })
  }
  else{
    line = new LeaderLine({
      start: startElement ,
      end: endElement,
      midLabel: label,
      color: 'rgb(255, 157, 157)'
    })
  }

  return line
}
