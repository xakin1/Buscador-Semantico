import { ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { StepBoxComponent } from 'src/app/shared/components/step-box/step-box.component';
import 'leader-line';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LabelsComponent } from 'src/app/shared/components/labels/labels.component';
import { DdComponent } from 'src/app/shared/components/dd/dd.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
  newColumn : number;
  newRow    : number;


  lastIndexTrue : number
  lastIndexFalse: number

  @ViewChild("viewContainer", { read: ViewContainerRef, static : false }) VCR: ViewContainerRef
  @ViewChild("keywords", { read: ViewContainerRef, static : false }) keyword: LabelsComponent
  @ViewChild("synonym", { read: ViewContainerRef, static : false }) synonym: LabelsComponent
  @ViewChild("dd", { read: ViewContainerRef, static : false }) dd: DdComponent

  name = new FormControl('', [Validators.required]);
  formGroup : FormGroup;
  isValid   : boolean = false;
  display   : boolean = false;

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

        name = name == undefined ? '' : name
        this.step[this.column][this.row].name = name;
    }
  }

  createNextStepWithOutConditions(){
    if(!this.step[this.column][this.row].haveNext){
      this.createNextStep(undefined)

      setTimeout(()=>{
        let startElement  = (<HTMLInputElement>document.getElementById(this.column +" "+this.row));
        let endElement    = (<HTMLInputElement>document.getElementById(this.lastId));

        let line = drawStepLine(startElement, endElement)
        this.step[this.column][this.row].lineNextStep = line;
      });
    }
  }

  saveCondition(i,id, condition) {
    this.isValid = this.name.invalid;
    if(!this.isValid){
      this.condition = condition;

      //Vemos si ya hemos creado la condición o si solo queremos modificarla
      if((<HTMLInputElement>document.getElementById("Condicion " + i)) != undefined){
        let label = (<HTMLInputElement>document.getElementById("Condicion " + i)).value;
        this.lastId = id;
        var select;
        var lineCondition

        //Miramos si es en la rama true o false

        select = condition ? document.getElementById("true " + i) as HTMLSelectElement
                           : document.getElementById("false " + i) as HTMLSelectElement;

        var selectedIndex = select.selectedIndex
        console.log()

        if(lineCondition != undefined ) lineCondition.remove()
          this.step[this.column][this.row].end = false;

          //si tenia un paso siguiente lo borramos y ponemos las condiciones
          if(this.step[this.column][this.row].lineNextStep != undefined){
            this.step[this.column][this.row].lineNextStep.remove()
            this.step[this.column][this.row].lineNextStep = undefined
          }

          let endElement      = (<HTMLInputElement>document.getElementById(id))
          let selectFalse     = document.getElementById("false " + i) as HTMLSelectElement;
          let selectTrue      = document.getElementById("true " + i) as HTMLSelectElement;
          this.lastIndexFalse = selectFalse.selectedIndex
          this.lastIndexTrue  = selectTrue.selectedIndex

          if (endElement == undefined) this.createNextStep(i);

          setTimeout(()=>{
            let startElement  = (<HTMLInputElement>document.getElementById(this.column +" "+this.row));
            let endElement    = (<HTMLInputElement>document.getElementById(this.lastId));

            if(startElement == endElement) endElement =  (<HTMLInputElement>document.getElementById("self " + id))

            let line = drawConditionalLine(startElement,endElement,label,this.condition, selectedIndex );

            //si hay una condicion simplemente la modificamos y si no la creamos
            if(this.step[this.column][this.row].lineConditions[i] == undefined)
              this.condition
                ? this.step[this.column][this.row].lineConditions.push({true: line, false: undefined, indexFalse: undefined, indexTrue: this.lastIndexTrue,
                    columnNextStepFalse: undefined, rowNextStepFalse: undefined, columnNextStepTrue: this.newColumn, rowNextStepTrue: this.newRow})

                : this.step[this.column][this.row].lineConditions.push({true: undefined, false: line, indexFalse: this.lastIndexFalse, indexTrue: undefined,
                    columnNextStepFalse: this.newColumn, rowNextStepFalse: this.newRow, columnNextStepTrue: undefined, rowNextStepTrue: undefined});
            else
              this.condition
                ? (this.step[this.column][this.row].lineConditions[i].true != undefined ?  (this.step[this.column][this.row].lineConditions[i].true.remove() ,this.step[this.column][this.row].lineConditions[i].true = line ): this.step[this.column][this.row].lineConditions[i].true = line,/*tendriamos que borrar el otro step pero eso ya luego*/
                   this.step[this.column][this.row].lineConditions[i].indexTrue = this.lastIndexTrue)

                :  (this.step[this.column][this.row].lineConditions[i].false != undefined ?  (this.step[this.column][this.row].lineConditions[i].false.remove() ,this.step[this.column][this.row].lineConditions[i].false = line ): this.step[this.column][this.row].lineConditions[i].false = line, this.step[this.column][this.row].lineConditions[i].indexFalse = this.lastIndexFalse)

            changeSelection(this.lastIndexFalse, false,i)
            changeSelection(this.lastIndexTrue, true, i )
          })

        this.step[this.column][this.row].conditions[i] = label;
      }
    }
    else {
      let selectFalse = document.getElementById("false " + i) as HTMLSelectElement;
      let selectTrue  = document.getElementById("true " + i) as HTMLSelectElement;

      selectFalse.selectedIndex = 0
      selectTrue.selectedIndex  = 0
    }
  }

  newCondition(){
    if(this.step[this.column][this.row].conditions.length == 0) this.step[this.column][this.row].conditions.push(undefined);
    else{
      this.isValid = this.name.invalid;
      if(!this.isValid && this.step[this.column][this.row].conditions[this.step[this.column][this.row].conditions.length-1] != undefined)
        this.step[this.column][this.row].conditions.push(undefined);
    }
  }

  toggleSidebar(){
    this.open = false;
    this.tree.close();
    this.saveStep();
  }

  loadStep(){
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

        if(selectFalse != undefined) selectFalse.selectedIndex  = element.indexFalse
        if(selectTrue  != undefined) selectTrue.selectedIndex   = element.indexTrue
        index++;
      });

      if(<HTMLInputElement>document.getElementById("Title") != undefined)
        (<HTMLInputElement>document.getElementById("Title")).value = this.step[this.column][this.row].name
    })
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

      this.loadStep()
    });

    childComponent.columns.push([{id: this.column+" "+this.row , name: "Title of Step", haveNext: false,
      conditions: [],dd: [],keywords: [], synonym: [], lineConditions: [],
      lineNextStep: undefined, unique_key: ++this.child_unique_key, end: false, backStepColumn: undefined, backStepRow: undefined, nextStep: [], conditionBack: undefined}])

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

  createColumn(i){
    let id = this.step.length +" 0";
    this.newColumn = this.step.length;
    this.newRow = 0;
    let name = 'Title of Step'

    this.step[this.column][this.row].haveNext = true

    this.step.push([{id: id , name: name, haveNext: false, conditions: [],dd: [],keywords: [],
      synonym: [], lineConditions: [],
        lineNextStep: undefined, unique_key: ++this.child_unique_key, end: false, backStepColumn: this.column, backStepRow: this.row,  nextStep:  [], conditionBack: i}]);

    this.lastId = id;
  }

  createStepInColumn(i) {
    let id          = (this.step.length -1) + " " + this.step[this.column+1].length
    let name        = 'Title of Step'
    this.newColumn  = this.step.length -1;
    this.newRow     = this.step[this.column+1].length

    this.step[this.column][this.row].haveNext = true

    this.step[this.column+1].push({id: id, name: name , haveNext: false, conditions: [], dd: [], keywords: [],
      synonym: [], lineConditions: [],
      lineNextStep: undefined, unique_key: ++this.child_unique_key, end: false, backStepColumn: this.column, backStepRow: this.row,  nextStep:  [], conditionBack: i});

    this.lastId = id;
  }

  createNextStep(i){
    if(this.step[this.column+1] == undefined) this.createColumn(i)
    else this.createStepInColumn(i)

    this.step[this.column][this.row].nextStep.push({nextStepColumn: this.newColumn, nextStepRow: this.newRow})
  }

  updateDd(event){
    if ((<HTMLInputElement>document.getElementById("dd")) != undefined){
      if((<HTMLInputElement>document.getElementById("dd")).value != undefined)
        this.step[this.column][this.row].dd[event.oldIndex] = ((<HTMLInputElement>document.getElementById("dd")).value.split(','));
        (<HTMLInputElement>document.getElementById("dd")).value =this.step[this.column][this.row].dd[event.newIndex].join()
    }
  }

  remove(index){
    if (index >= 0) {
      this.step[this.column][this.row].dd.splice(index, 1);
      (<HTMLInputElement>document.getElementById("dd")).value =this.step[this.column][this.row].dd[index].join()
    }
  }

  addDd(){
    this.step[this.column][this.row].dd.push([])
  }

  saveStep() {
      this.step[this.column][this.row].keyword = this.keyword != undefined ? this.keyword.labels : [];
      this.step[this.column][this.row].synonym = this.synonym != undefined ? this.synonym.labels : [];

      this.saveNameStep()
  }

  removeNextStep(column, row){
    let rowb = this.step[column][row].backStepRow;
    let columnb = this.step[column][row].backStepColumn;

    if( rowb != undefined && columnb != undefined){
      if(this.step[columnb][rowb].lineNextStep != undefined){
        this.step[columnb][rowb].lineNextStep.remove();
        this.step[columnb][rowb].lineNextStep = undefined
      }
    }

    if(this.step[column][row].haveNext == true)
      this.step[column][row].nextStep.forEach(element => {
        this.removeNextStep(element.nextStepColumn, element.nextStepRow)
        element.nextStepColumn = undefined;
        element.nextStepRow = undefined
      });

    //TODO REVISAR ESTO A LO MEJOR HAY ALGUN CASO EN EL QUE NO SEA CIERTO
    if(rowb != undefined && columnb != undefined) this.step[columnb][rowb].haveNext = false
    this.step[column].splice(row,1);
    if(this.step[column] == []) this.step.splice(column, 1)
  }

  removeNextConditionalStep(column, row){
    let rowb = this.step[column][row].backStepRow;
    let columnb = this.step[column][row].backStepColumn;
    let conditionBack = this.step[column][row].conditionBack;

      if(this.step[columnb][rowb].lineConditions[conditionBack].true != undefined){
        this.step[columnb][rowb].lineConditions[conditionBack].true.remove();
        this.step[columnb][rowb].lineConditions[conditionBack].true = undefined
      }
      if(this.step[columnb][rowb].lineConditions[conditionBack].false != undefined){
        this.step[columnb][rowb].lineConditions[conditionBack].false.remove();
        this.step[columnb][rowb].lineConditions[conditionBack].false = undefined
      };

      this.step[columnb][rowb].conditions.splice(conditionBack,1);

    if(this.step[column][row].haveNext == true)
      this.step[column][row].lineConditions.forEach(element => {
        if(element.rowNextStepTrue != undefined && element.columnNextStepTrue != undefined)
          this.removeNextConditionalStep(element.columnNextStepTrue,element.rowNextStepTrue)

        if(element.rowNextStepFalse != undefined && element.columnNextStepFalse != undefined)
          this.removeNextConditionalStep(element.columnNextStepFalse,element.rowNextStepFalse)
        element.nextStepColumn = undefined;
        element.nextStepRow = undefined
      });

    this.step[column].splice(row,1);
    if(this.step[column].length == 0)
      this.step.splice(column, 1)
  }

  removeStep(){
    this.edit = false;
    try{
      this.removeNextConditionalStep(this.column, this.row)

      this.removeNextStep(this.column, this.row)
    }
    catch(e){
      console.log(e)
    }
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
