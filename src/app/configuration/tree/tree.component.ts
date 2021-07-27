import { ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { StepBoxComponent } from 'src/app/shared/components/step-box/step-box.component';
import 'leader-line';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LabelsComponent } from 'src/app/shared/components/labels/labels.component';
import { DdComponent } from 'src/app/shared/components/dd/dd.component';
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
  accesiblestep      : any = undefined;

  step      : any = undefined;
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


  formGroup : FormGroup;
  display   : boolean = false;
  vacio     : boolean = true;

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

    this.openNav()
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if(this.step != undefined)
      this.removeNextStep(0,0, undefined, undefined)
  }

  saveNameStep() {
    if((<HTMLInputElement>document.getElementById("Title")) != undefined){
        let name = (<HTMLInputElement>document.getElementById("Title")).value;

        name = name == undefined ? '' : name
        this.step[this.column][this.row].name = name;
    }
  }

  saveNameStepCondition(i) {
    if((<HTMLInputElement>document.getElementById("Condicion "+i)) != undefined){
        let name = (<HTMLInputElement>document.getElementById("Condicion "+i)).value;
        this.step[this.column][this.row].conditionIndex[i].conditionName = name;
    }
  }

  createNextStepWithOutConditions(id){
    if(this.step[this.column][this.row].nextStep != []){
      let selectDefault  = document.getElementById("next Step") as HTMLSelectElement;
      this.step[this.column][this.row].defaultIndex = selectDefault.selectedIndex;
      this.create(0,id)

      setTimeout(()=>{
        let startElement  = (<HTMLInputElement>document.getElementById(this.column +" "+this.row));
        id = id == undefined ? this.lastId : id
        let endElement    = (<HTMLInputElement>document.getElementById(id));

        let line;

        if(startElement == endElement){
           endElement =  (<HTMLInputElement>document.getElementById("self " + id))
           line = drawSelfLine(startElement,endElement)
        }
        else line = drawStepLine(startElement, endElement)

        this.setNextStep(0,line)
      });
    }
  }

  // i: Nº de la condición que activo esta función
  // id: id del step seleccionado
  // condition: boolean que indica si es la rama true o false
  saveCondition(i,id) {
      //Vemos si ya hemos creado la condición o si solo queremos modificarla
      if((<HTMLInputElement>document.getElementById("Condicion " + i)) != undefined){
        let label = (<HTMLInputElement>document.getElementById("Condicion " + i)).value;
        this.lastId = id;
        var select;

        select = document.getElementById("true " + i) as HTMLSelectElement;

        let index = i + 1;

        let selectTrue      = document.getElementById("true " + i) as HTMLSelectElement;
        this.step[this.column][this.row].conditionIndex[i].true  = selectTrue.selectedIndex;

        this.create(index,id)

        setTimeout(()=>{
          let startElement  = (<HTMLInputElement>document.getElementById(this.column +" "+this.row));
          let endElement    = (<HTMLInputElement>document.getElementById(this.lastId));

            let line;

            if(startElement == endElement){
              endElement =  (<HTMLInputElement>document.getElementById("self " + id))
              line       = drawSelfConditionalLine(startElement,endElement, label)
           }
           else line = drawConditionalLine(startElement,endElement,label);

            this.setNextStep(index,line)

        })

        this.step[this.column][this.row].conditions[i] = label;
      }
      else {
        let selectTrue = document.getElementById("true " + i) as HTMLSelectElement;

        selectTrue.selectedIndex  = 0
      }
  }

  create(index,id){
    setTimeout(()=>{
      //si tenia un paso siguiente lo borramos y ponemos las condiciones
      if(this.step[this.column][this.row].nextStep[index] != undefined ? this.step[this.column][this.row].nextStep[index].line != undefined : false ){
        if(this.step[this.column][this.row].nextStep[index].row != undefined){
          let column = this.step[this.column][this.row].nextStep[index].column;
          let row = this.step[this.column][this.row].nextStep[index].row;
          if(!this.step[column][row].deleted){
            this.step[this.column][this.row].nextStep[index].line.remove()
            this.step[this.column][this.row].nextStep[index].line = undefined
            let indexStep = 0
            this.step[column][row].backStep.forEach(backStep => {
              if(backStep.column == this.column && backStep.row == this.row) return;
              else indexStep++
            });
            this.step[column][row].backStep.splice(indexStep,1)
             //Ver si tenia un siguiente y si se queda sin ninguna flecha anterior borrarlo
            if(this.step[column][row].backStep.length == 0)
              this.removeStep(column,row)
          }
        }
      }
    })

    setTimeout(()=>{
      let endElement      = (<HTMLInputElement>document.getElementById(id))
      if (endElement == undefined ||endElement == null) this.createNextStep(index);
      else{
        this.newColumn = id.split(' ')[0]
        this.newRow = id.split(' ')[1]
        this.step[this.newColumn][this.newRow].backStep.push({column: this.column, row: this.row, condition: index})
      }
    })
  }

  setNextStep(index, line){
    if(this.step[this.column][this.row].nextStep[index] == undefined)
      if(this.newColumn == this.column && this.newRow == this.row )
        this.step[this.column][this.row].nextStep[index] = ({column: undefined, row: undefined, line: line});
      else
        this.step[this.column][this.row].nextStep[index] = ({column: this.newColumn , row: this.newRow,  line: line});
    else{
      if(this.step[this.column][this.row].nextStep[index].line != undefined){
        this.step[this.column][this.row].nextStep[index].line.remove()
        this.step[this.column][this.row].nextStep[index].line = undefined
      }

      if(this.newColumn == this.column && this.newRow == this.row )
        this.step[this.column][this.row].nextStep[index] = ({column: undefined, row: undefined, line: line});
      else
        this.step[this.column][this.row].nextStep[index] = ({column: this.newColumn , row: this.newRow,  line: line});
    }
    this.chargeIndex();
  }

  newCondition(){
    if( this.step[this.column][this.row].conditionIndex[this.step[this.column][this.row].conditionIndex.length-1].conditionName != undefined){
      this.step[this.column][this.row].conditions.push(undefined);
      this.step[this.column][this.row].conditionIndex.push({true: undefined, conditionName: undefined})
    }
  }
  toggleSidebar(){
    this.open = false;
    this.tree.close();
    this.saveStep();
  }

  chargeIndex(){
    let index = 0;
     //Revisar
     let selectDefault = document.getElementById("next Step") as HTMLSelectElement;
     if(selectDefault != undefined){
      selectDefault.selectedIndex  = this.step[this.column][this.row].defaultIndex;
    }

     this.step[this.column][this.row].conditionIndex.forEach(condition => {
      let selectTrue = document.getElementById("true " + index) as HTMLSelectElement;

      if(selectTrue != undefined) selectTrue.selectedIndex = condition.true;
      index++;
    });
  }

  loadStep(){
    setTimeout(()=>{
      let index = 0

      this.step[this.column][this.row].conditions.forEach(element => {
        if(element != undefined) (<HTMLInputElement>document.getElementById("Condicion " + index)).value = element;
        index++;
      })
    });

    setTimeout(()=>{
      this.chargeIndex();
      if(<HTMLInputElement>document.getElementById("Title") != undefined)
        (<HTMLInputElement>document.getElementById("Title")).value = this.step[this.column][this.row].name
    })
  }

  createEnd(){
    let startElement = (<HTMLInputElement>document.getElementById(this.column +" "+this.row));
    this.tree.end(this.column,this.row, startElement)
  }

  createStep(){
    this.vacio = false;
    //miramos si esta borrado o no
    if(this.step != undefined ? !this.step[0][0].deleted : true){
      let componentFactory   = this.resolver.resolveComponentFactory(StepBoxComponent);
      let childComponentRef  = this.VCR.createComponent(componentFactory);
      let childComponent     = childComponentRef.instance;

      childComponent.edit.subscribe(($event) => {
        this.edit           = true;
        this.row            = $event.row;
        this.column         = $event.column;
        childComponent.open = true;

        this.openNav();
        this.loadStep()
      });

      childComponent.columns.push([{id: this.column+" "+this.row , name: "Title of Step",
        conditions: [undefined],dd: [],keywords: [], synonym: [], end: false,
        backStep: [], nextStep: [], deleted: false, conditionIndex: [{true: undefined, conditionName: undefined}], defaultIndex: undefined }])

      this.step = childComponent.columns;
      this.tree = childComponent;
    }
    else{
      this.step[0][0] = {id: this.step[0][0].id , name: "Title of Step",
      conditions: [undefined],dd: [],keywords: [], synonym: [], end: false,
      backStep:[], nextStep: this.step[0][0].nextStep, deleted: false, conditionIndex: [{true: undefined, conditionName: undefined}], defaultIndex: undefined}
    }
    this.closeNav();

  }

  changeLabelOfLine(i,label){
    this.step[this.column][this.row].lineConditions[i].setOptions({endLabel: label})
  }

  createColumn(i){
    let id = this.column + 1 +" 0";
    this.newColumn = this.column +1;
    this.newRow = 0;
    let name = 'Title of Step'

    //miramos si esta borrado o no (ya que si lo estuvieramos creando nextstep no podría tener nada)
    if(this.step[this.column][this.row].nextStep[i] == undefined || (this.step[this.column][this.row].nextStep[i] != undefined &&
       this.step[this.column][this.row].nextStep[i].row == undefined) ){
      this.step.push([{id: id , name: name, conditions: [undefined],dd: [],keywords: [],
        synonym: [], end: false, backStep: [{column: this.column, row: this.row, condition: i, defaultIndex: undefined}],
        nextStep:  [], deleted: false, conditionIndex: [{true: undefined, conditionName: undefined}]}]);
    }
    else{
      this.newColumn = this.step[this.column][this.row].nextStep[i].column;
      this.newRow = this.step[this.column][this.row].nextStep[i].row;

        let column = this.step[this.newColumn][this.newRow].id.split(' ')[0]

        id =  this.step[this.newColumn][this.newRow].id  == this.step[this.column][this.row].id ? column + 1 + " " + 0 : this.step[this.newColumn][this.newRow].id

        if(this.step[this.column][this.row].nextStep[i].line != undefined){
          this.step[this.column][this.row].nextStep[i].line.remove();
          this.step[this.column][this.row].nextStep[i].line = undefined;
        }

        this.step[this.newColumn][this.newRow] = {id: id , name: name, conditions: [undefined],dd: [],keywords: [],
          synonym: [], end: false, backStep: [{column: this.column, row: this.row, condition: i}],
          nextStep: this.step[this.newColumn][this.newRow].nextStep, deleted: false, conditionIndex: [{true: undefined, conditionName: undefined}],defaultIndex: undefined}
    }

    this.lastId = id;
  }

  createStepInColumn(i) {
    let id          = this.column + 1 + " " + this.step[this.column+1].length
    let name        = 'Title of Step'
    this.newColumn  = this.column + 1;
    this.newRow     = this.step[this.column+1].length

    //miramos si esta borrado o no (ya que si lo estuvieramos creando nextstep no podría tener nada)
    if(this.step[this.column][this.row].nextStep[i] == undefined  || (this.step[this.column][this.row].nextStep[i] != undefined && this.step[this.column][this.row].nextStep[i].row == undefined)){
      this.step[this.column+1].push({id: id, name: name , conditions: [undefined], dd: [], keywords: [],
        synonym: [], end: false,backStep: [{column: this.column, row: this.row, condition: i,defaultIndex: undefined}],
        nextStep:  [], deleted: false,conditionIndex: [{true: undefined, conditionName: undefined}]});
    }
    else{
      this.newRow = this.step[this.column][this.row].nextStep[i].row;

      if(!this.step[this.newColumn][this.newRow].deleted){
        this.newRow     = this.step[this.column+1].length

        this.step[this.column+1].push({id: id, name: name , conditions: [undefined], dd: [], keywords: [],
          synonym: [], end: false,backStep: [{column: this.column, row: this.row, condition: i,defaultIndex: undefined}],
          nextStep:  [], deleted: false,conditionIndex: [{true: undefined, conditionName: undefined}]});
      }
      else{
        id =  this.step[this.newColumn][this.newRow].id;

        if(this.step[this.column][this.row].nextStep[i].line != undefined){
          this.step[this.column][this.row].nextStep[i].line.remove();
          this.step[this.column][this.row].nextStep[i].line = undefined;
        }
        this.step[this.newColumn][this.newRow] = {id: id , name: name, conditions: [undefined],dd: [],keywords: [],
          synonym: [], end: false, backStep: [{column: this.column, row: this.row, condition: i}],
          nextStep:  this.step[this.newColumn][this.newRow].nextStep, deleted: false, conditionIndex: [{true: undefined, conditionName: undefined}],defaultIndex: undefined}
      }
    }

    this.lastId = id;
  }

  createNextStep(i){
    if(this.step[this.column+1] == undefined ? true : this.step[this.column+1][0].deleted ) this.createColumn(i)
    else this.createStepInColumn(i)
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

  removeNextStep(column, row, columnb, rowb){
    let j = 0;

    for(j = 0; j < this.step[column][row].nextStep.length; j++){
      if(this.step[column][row].nextStep[j] != undefined){
        let rown = this.step[column][row].nextStep[j].row;
        let columnn = this.step[column][row].nextStep[j].column;

        if((this.step[column][row].nextStep[j] != undefined && rown != undefined && columnn != undefined) ? !this.step[columnn][rown].deleted : false)
          this.removeNextStep(columnn, rown,column, row);
      }
    }

    let x = 0
    let i = 0
    //Borramos todas las flechas que lleguen a este
    let backStepLength = this.step[column][row].backStep.length
    for(j = 0; j< backStepLength ; j++){
      let rowB    = this.step[column][row].backStep[x].row
      let columB  = this.step[column][row].backStep[x].column
      let conditionB = this.step[column][row].backStep[x].condition
      if(this.column == column && this.row == row){
        this.step[columB][rowB].nextStep.forEach(nextStep => {
          if(nextStep.column == column && row == nextStep.row){
            nextStep.line.remove();
            nextStep.line = undefined;
          }
          if((this.step[column][row].nextStep[j] != undefined ? this.step[column][row].nextStep[j].row == undefined : false)){
            nextStep.line.remove();
            nextStep.line = undefined;
            this.step[columB][rowB].nextStep.splice(i,1)
          }
          i++;
        });
        this.step[column][row].backStep.splice(0,1)
      }
      else if((columB == columnb && rowB == rowb) || (columB == column && rowB == row)){
        this.step[columB][rowB].nextStep[conditionB].line.remove();
        this.step[columB][rowB].nextStep[conditionB].line = undefined;
        this.step[column][row].backStep.splice(x,1)
        x--;
      }
      x++;
    }

    if(this.step[column][row].backStep.length == 0) {
      this.step[column][row].deleted = true;
    }
  }

  removeStep(column,row){
    this.removeNextStep(column, row, undefined, undefined)
    if(this.step[0][0].deleted) {
      this.vacio = true;
      this.openNav();
      this.edit = false
    }
  }

  availableSteps(step){
    let avialableSteps = []

    //Eliminamos los steps borrados para que no puedan ser seleccionados en el comboBox
    step.flat().forEach(element => {
      if(!element.deleted) avialableSteps.push(element)
    });

    return avialableSteps
  }

  /* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
  openNav() {
    document.getElementById("mySidebar").style.width = "350px";
  }

  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  closeNav() {
    document.getElementById("mySidebar").style.width = "0";
}

}

function drawStepLine(startElement, endElement){
  let line = new LeaderLine({
      start: startElement,
      end: endElement,
      })

  return line
}

function drawConditionalLine(startElement, endElement,label){
  let line = new LeaderLine({
    start: startElement,
    end: endElement,
    endLabel: label,
    color: 'rgb(110, 224, 181)'
  })

  return line
}

function drawSelfConditionalLine(startElement, endElement, label){
  let line = new LeaderLine({
    start: startElement,
    end: endElement,
    path: "magnet",
    endLabel: label,
    color: 'rgb(110, 224, 181)'
    });

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

function changeSelection(index,i){
  var select = document.getElementById("true "+i) as HTMLSelectElement;
  select.selectedIndex = index
}
