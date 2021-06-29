import { ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { StepBoxComponent } from 'src/app/shared/components/step-box/step-box.component';
import 'leader-line';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  placeholderSynonym : string  = "Nuevo sinónimo...";
  child_unique_key   : number  = -1;

  step      : any;
  steps     : any = [];
  tree      : any;
  condition : boolean = false;
  lastId    : string;

  lastIndexTrue : number
  lastIndexFalse: number

  @ViewChild("viewContainer", { read: ViewContainerRef, static : false }) VCR: ViewContainerRef
  name = new FormControl('', [Validators.required]);
  formGroup : FormGroup;
  isValid   : boolean = false;

  constructor(private resolver: ComponentFactoryResolver,private _formBuilder: FormBuilder) { }

  init(){
    return this._formBuilder.group({
      cont :new FormControl('', [Validators.required]),
    })
  }

  ngOnInit() {
     this.formGroup = this._formBuilder.group({
       Ctrl: ['', Validators.required]
    });

  }
  saveNameStep() {
    if((<HTMLInputElement>document.getElementById("Title")) != undefined){
        let name = (<HTMLInputElement>document.getElementById("Title")).value;
        this.step[this.column][this.row].name = name;
        this.steps[this.step[this.column][this.row].unique_key].name = name;
    }
  }

  saveCondition(i,id, condition) {
    this.isValid = this.name.invalid;
    if(!this.isValid){
      this.condition = condition;

      if((<HTMLInputElement>document.getElementById("Condicion " + i)) != undefined){
        let label = (<HTMLInputElement>document.getElementById("Condicion " + i)).value;
        this.lastId = id;
        var select;
        var lineCondition

        if(condition){
          lineCondition = this.step[this.column][this.row].lineConditions[i].true
          select = document.getElementById("true " + i) as HTMLSelectElement;
        }
        else{
          lineCondition = this.step[this.column][this.row].lineConditions[i].false
          select = document.getElementById("false " + i) as HTMLSelectElement;
        }

        var selectedIndex = select.selectedIndex

        if(lineCondition != undefined ) lineCondition.remove()
          this.step[this.column][this.row].end = false;

          if(this.step[this.column][this.row].lineNextStep != undefined) this.step[this.column][this.row].lineNextStep.remove()

          let endElement      = (<HTMLInputElement>document.getElementById(id))
          let selectFalse     = document.getElementById("false " + i) as HTMLSelectElement;
          let selectTrue      = document.getElementById("true " + i) as HTMLSelectElement;
          this.lastIndexFalse = selectFalse.selectedIndex
          this.lastIndexTrue  = selectTrue.selectedIndex

          if (endElement == undefined) this.createNextStep();

          setTimeout(()=>{
            let startElement  = (<HTMLInputElement>document.getElementById(this.column +" "+this.row));
            let endElement    = (<HTMLInputElement>document.getElementById(this.lastId));

            if(startElement == endElement) endElement =  (<HTMLInputElement>document.getElementById("self " + id))

            let line = drawConditionalLine(startElement,endElement,label,this.condition, selectedIndex );

            if(this.step[this.column][this.row].lineConditions[i] == undefined)
              this.condition
                ? this.step[this.column][this.row].lineConditions.push({true: line, false: undefined, indexFalse: undefined, indexTrue: this.lastIndexTrue})
                : this.step[this.column][this.row].lineConditions.push({true: undefined, false: false, indexFalse: this.lastIndexFalse, indexTrue: undefined});
            else
              this.condition
                ? (this.step[this.column][this.row].lineConditions[i].true  = line, this.step[this.column][this.row].lineConditions[i].indexTrue  = this.lastIndexTrue )
                : (this.step[this.column][this.row].lineConditions[i].false = line, this.step[this.column][this.row].lineConditions[i].indexFalse = this.lastIndexFalse)

            changeSelection(this.lastIndexFalse, false,i)
            changeSelection(this.lastIndexTrue, true, i )
          })

        this.step[this.column][this.row].conditions[i] = label;
      }
    }
    else {
      let selectFalse     = document.getElementById("false " + i) as HTMLSelectElement;
      let selectTrue      = document.getElementById("true " + i) as HTMLSelectElement;
      selectFalse.selectedIndex = 0
      selectTrue.selectedIndex = 0
    }
  }

  newCondition(){

    if(this.step[this.column][this.row].conditions.length == 0){
      this.step[this.column][this.row].conditions.push(undefined);
      this.step[this.column][this.row].lineConditions.push({true: undefined, false: undefined, indexFalse: undefined, indexTrue: undefined});
    }
    else{
      this.isValid = this.name.invalid;
      if(!this.isValid){
        this.step[this.column][this.row].conditions.push(undefined);
        this.step[this.column][this.row].lineConditions.push({true: undefined, false: undefined, indexFalse: undefined, indexTrue: undefined});
      }
    }
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
    let componentFactory   = this.resolver.resolveComponentFactory(StepBoxComponent);
    let childComponentRef  = this.VCR.createComponent(componentFactory);
    let childComponent     = childComponentRef.instance;

    childComponent.edit.subscribe(($event) => {
      this.edit           = true;
      this.open           = true;
      this.row            = $event.row;
      this.column         = $event.column;
      childComponent.open = true;



      setTimeout(()=>{
        let index = 0

        this.step[this.column][this.row].conditions.forEach(element => {
          (<HTMLInputElement>document.getElementById("Condicion " + index)).value = element;
          index++;
        })
      });


      setTimeout(()=>{
        let index = 0

        this.step[this.column][this.row].lineConditions.forEach(element => {
          let selectFalse = document.getElementById("false " + index) as HTMLSelectElement;
          let selectTrue  = document.getElementById("true " + index) as HTMLSelectElement;

          if(selectFalse  != undefined) selectFalse.selectedIndex   = element.indexFalse
          if(selectTrue   != undefined) selectTrue.selectedIndex    = element.indexTrue
          index++;
        });

        if(<HTMLInputElement>document.getElementById("Title") != undefined)
          (<HTMLInputElement>document.getElementById("Title")).value = this.step[this.column][this.row].name
      })
    });

    childComponent.columns.push([{id: this.column+" "+this.row , name: "Title of Step", haveNext: false,
      conditions: [],dd: [],keywords: [], synonym: [], lineConditions: [{true: undefined, false: undefined,
      indexFalse: undefined, indexTrue: undefined}], lineNextStep: undefined, unique_key: ++this.child_unique_key, end: false}])

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
    this.step[this.column][this.row].lineConditions[i].setOptions({endLabel: label})
  }

  createColumn(){
    let id = this.step.length +" 0";
    let name = 'Title of Step'

    this.step[this.column][this.row].haveNext = true

    this.step.push([{id: id , name: name, haveNext: false, conditions: [],dd: [],keywords: [], synonym: [],
      lineConditions: [{true: undefined, false: undefined,indexFalse: undefined, indexTrue: undefined}],
      lineNextStep: undefined, unique_key: ++this.child_unique_key, end: false}]);

    this.steps.push({id: id, name:name })

    this.lastId = id;
  }

  createStepInColumn() {
    let id = ( this.step.length -1) +" "+this.step[this.column+1].length
    let name = 'Title of Step'

    this.step[this.column+1].push({id: id, name: name , haveNext: false, conditions: [],dd: [],keywords: [],
      synonym: [], lineConditions: [{true: undefined, false: undefined,indexFalse: undefined, indexTrue: undefined}],
      lineNextStep: undefined, unique_key: ++this.child_unique_key, end: false})

    this.steps.push({id: id, name: name})

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

function drawConditionalLine(startElement, endElement,label,condition, index){
  let line = new LeaderLine({
    start: startElement,
    end: endElement,
    endLabel: label,
    color: condition ? 'rgb(110, 224, 181)' : 'rgb(255, 157, 157)'
  })

  return line
}

function changeSelection(index,condition,i){
  var select = document.getElementById(condition+" "+i) as HTMLSelectElement;
  select.selectedIndex = index
}
