import { C } from '@angular/cdk/keycodes';
import { Component, ComponentFactoryResolver, DoCheck, HostListener, OnChanges, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StepBoxComponent } from 'src/app/shared/components/step-box/step-box.component';
import { ComboBoxStepsComponent } from './combo-box-steps/combo-box-steps.component';
declare let LeaderLine: any;
declare const send_get_step: any;
declare const send_get_command: any;
declare const send_get_command_with_several_steps: any;
declare const send_create_step: any;
declare const cargarComandos: any;
declare const searchStep: any;

@Component({
  selector: 'app-work-flow',
  templateUrl: './work-flow.component.html',
  styleUrls: ['./work-flow.component.scss']
})
export class WorkFlowComponent implements OnInit{

  condition : boolean = false;
  lastId    : string = '';
  newColumn : number = -1;
  newRow    : number = -1;
  commands = undefined;
  commandId : string = undefined


  step   : any[][] = []
  tree   : any;
  row    : number = 0
  column : number = 0
  vacio  : boolean = true;

  @ViewChild("viewContainer", { read: ViewContainerRef}) VCR: ViewContainerRef;
  @ViewChild("app-combo-box-steps") comboSteps: ComboBoxStepsComponent;


  constructor(private router:Router,private route: ActivatedRoute,private resolver: ComponentFactoryResolver,private _formBuilder: FormBuilder) {
    this.commandId = this.route.snapshot.paramMap.get('commandID');

    this.step.push([{id: this.column+" "+this.row, idBd: undefined, name: "", description: undefined,
      conditions: [undefined],dd: [],keywords: [], synonym: [], end: false, searchBox: {keywords: [], dd: [], show: false, altoBusqueda: undefined, anchoBusqueda: undefined, altoBarra: undefined, anchoBarra: undefined, placeHolder: "Search..."},
      backStep:[], nextStep: undefined, deleted: false, conditionIndex: [{true: undefined, conditionName: undefined}], defaultIndex: undefined}])
  }


  async ngOnInit() {
    cargarComandos();
    this.commands = await send_get_command_with_several_steps()
    this.initializeSteps(this.commands[0].steps)
  }


  @HostListener("resize", ["$event"])
  @HostListener("window:scroll", ["$event"])
  @HostListener("scroll", ["$event"])
  @HostListener("DOMMouseScroll mousewheel", ["$event"])
  a(){
    console.log("funciono")
    window.dispatchEvent(new Event('resize'))
  }

  open(url){
    this.router.navigate(["xaquin/"+url])
  }

  initializeStep(i,condition,step,conditional,varColumn){
    //console.log(step)
    this.column = varColumn
    if(step != undefined)
    this.createNextStep(i,step);
    let column = this.column
    let row  = this.row
    let newRow = this.newRow
    let newColumn = this.newColumn
    setTimeout(() => {
        let startElement  = (<HTMLInputElement>document.getElementById(column +" "+row));

        let endElement    = (<HTMLInputElement>document.getElementById(newColumn+" "+newRow));

        let line;

        if(startElement == endElement){
          endElement =  (<HTMLInputElement>document.getElementById("self " + column +" "+row))
          if(conditional) line = drawSelfConditionalLine(startElement,endElement,step.condition)
          else line = drawSelfLine(startElement,endElement)
        }
        else{
          if(conditional) line = drawConditionalLine(startElement,endElement,step.condition)
          else line = drawStepLine(startElement,endElement)
        }

        console.log("row :" +newRow)
        this.step[newColumn][newRow].backStep[newRow] = ({column: column, row: row, line: line});
        this.step[column][row].nextStep[newRow] = ({column: newColumn , row: newRow,  line: line});
        //Por si las flechas se desajustan al crearse por cualquier motivo
        window.dispatchEvent(new Event('resize'))
      })
      if(conditional){
        console.log(this.getIndexOfFlatStep(column));
        (this.step[column][row].conditionIndex[condition] != undefined && step.condition != undefined)
        ? this.step[column][row].conditionIndex[condition] = ({true: this.getIndexOfFlatStep(column) + newRow, conditionName: step.condition})
        : this.step[column][row].conditionIndex.push({true: this.getIndexOfFlatStep(column) + newRow, conditionName: step.condition})

        this.step[column][row].conditions[condition] = step.condition
        this.newCondition()

      }
  }

  createSteps(steps,i,col){
    let nextSteps = []
    let index = 1
    let condition = 0

    setTimeout(() => {
        let add = true
        steps[i].nextSteps.forEach((nextStep) => {
          nextSteps.push(searchStep(steps,nextStep.stepID))
          let conditional = nextStep.condition != "-"
          if(nextStep.stepName != ""){
            this.initializeStep(index,condition,{stepName: nextStep.stepName,stepDescription: nextStep.stepDescription,condition: nextStep.condition,stepID: nextStep.stepID},conditional,col)
            if(conditional) condition ++
          }
          else add = false
          index++
        });
        //Si es una condición no hace falta que avance de columna pero si no la es si
        if(add){
          this.column++
        }
        for(let stepNumber of nextSteps)
          if(stepNumber != -1){
            this.createSteps(steps,stepNumber,col + 1)
          }
    });

    setTimeout(() => {
      this.row = 0;
      this.column = 0;
      this.loadStep()
    });

  }



  initializeSteps(steps: any){

    let componentFactory   = this.resolver.resolveComponentFactory(StepBoxComponent);
    let childComponentRef  = this.VCR!.createComponent(componentFactory);
    let childComponent     = childComponentRef.instance;

    childComponent.edit.subscribe(($event) => {
      this.row            = $event.row;
      this.column         = $event.column;
      childComponent.open = true;
      this.loadStep()
      window.dispatchEvent(new Event('resize'))
    });

    this.step = childComponent.columns;
    this.tree = childComponent;

    childComponent.columns.push([{id: 0+" "+0, idBd: steps[0].stepID , name: steps[0].step.stepName, description: steps[0].step.stepDescription,
    conditions: [undefined], end: false, searchBox: {keywords: [], dd: [], show: false, altoBusqueda: undefined, anchoBusqueda: undefined, altoBarra: undefined, anchoBarra: undefined, placeHolder: "Search..."},
    backStep: [], nextStep: [{column: undefined, row: undefined, line: undefined}], deleted: false, conditionIndex: [{true: undefined, conditionName: undefined}], defaultIndex: undefined }])


    this.column = 0
    this.row = 0

    this.createSteps(steps,0,0)

    setTimeout(() => {
      this.row = 0;
      this.column = 0;
      this.loadStep()
    });

  }

  onRoute(stepID){
    window.location.replace("/comando/"+this.commandId+"/step/"+stepID)
  }

  newCondition(){
    if( this.step[this.column][this.row].conditionIndex[this.step[this.column][this.row].conditionIndex.length-1].conditionName != undefined){
      this.step[this.column][this.row].conditions.push(undefined);
      this.step[this.column][this.row].conditionIndex.push({true: undefined, conditionName: undefined})
    }
  }

  async createNextStepWithOutConditions(id : string,step : any){

    if(this.step[this.column][this.row].nextStep != []){
      let step=-1
      //if(step == undefined) step = await await send_create_step(this.commandId,{stepName : "Paso nuevo"});
      this.step[this.column][this.row].defaultIndex = document.getElementById("next Step") as HTMLSelectElement;
      this.create(0,id,step)

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

  saveNameStepCondition(i: number) {
    if((<HTMLInputElement>document.getElementById("Condicion "+i)) != undefined){
        let name = (<HTMLInputElement>document.getElementById("Condicion "+i)).value;
        this.step[this.column][this.row].conditionIndex[i].conditionName = name;
    }
  }

  availableSteps(step: any){
    let avialableSteps : any[] = []

    //Eliminamos los steps borrados para que no puedan ser seleccionados en el comboBox
    step!.flat().forEach((element: any)  => {
      if(!element.deleted) avialableSteps.push(element)
    });

    return avialableSteps
  }

  create(index: number,id: string, step: any){
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
            this.step[column][row].backStep.forEach((backStep: any) => {
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
      //Si el elemento al que nos vamos a enlazar no existe lo creamos
      if (endElement == undefined ||endElement == null) this.createNextStep(index,step);
      else{
        this.newColumn = +id.split(' ')[0]
        this.newRow = +id.split(' ')[1]
        this.step[this.newColumn][this.newRow].backStep.push({column: this.column, row: this.row, condition: index})
      }
    })
  }

  removeNextStep(column : number, row : number, columnb : number, rowb : number){
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
        this.step[columB][rowB].nextStep.forEach((nextStep : any) => {
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

  removeStep(column: number,row : number){
    this.removeNextStep(column, row, -1, -1)
    if(this.step[0][0].deleted) {
      this.vacio = true;
    }
  }

  // i: Nº de la condición que activo esta función
  // id: id del step seleccionado
  // step : paso que vamos a crear (id, nombre, descripcion).
  async saveCondition(i : number, id : string, step : any) {
    console.log(id)
    //Vemos si ya hemos creado la condición o si solo queremos modificarla
    if((<HTMLInputElement>document.getElementById("Condicion " + i)) != undefined){
      let label = (<HTMLInputElement>document.getElementById("Condicion " + i)).value;
      this.lastId = id;

      let index = i + 1;

      let selectTrue      = document.getElementById("true " + i) as HTMLSelectElement;
      this.step[this.column][this.row].conditionIndex[i].true  = selectTrue.selectedIndex;

      //if(step == undefined) step = await send_create_step(this.commandId,{stepName: "Paso nuevo"})
      console.log(step)
      this.create(index,id,step)

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

  setNextStep(index : number, line : any){
    console.log("B")
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

  chargeIndex(){
    let index = 0;
    //Revisar
    let selectDefault = document.getElementById("next Step") as HTMLSelectElement;
    if(selectDefault != undefined){
      selectDefault.selectedIndex  = this.step[this.column][this.row].defaultIndex;
    }

     this.step[this.column][this.row].conditionIndex.forEach((condition : any) => {
      let selectTrue = document.getElementById("true " + index) as HTMLSelectElement;

      if(selectTrue != undefined) selectTrue.selectedIndex = condition.true;
      index++;
    });
  }

  createNextStep(i: number, step: any){
    if(this.step[this.column+1] == undefined ? true : this.step[this.column+1][0].deleted ) this.createColumn(i,step)
    else this.createStepInColumn(i,step)
  }

  createStepInColumn(i: number, step: any) {
    let id          = this.column + 1 + " " + this.step[this.column+1].length
    let name = step != undefined ? step.stepName : 'Title of Step'
    this.newColumn  = this.column + 1;
    this.newRow     = this.step[this.column+1].length

    //miramos si esta borrado o no (ya que si lo estuvieramos creando nextstep no podría tener nada)
    if(this.step[this.column][this.row].nextStep[i] == undefined  || (this.step[this.column][this.row].nextStep[i] != undefined && this.step[this.column][this.row].nextStep[i].row == undefined)){
      this.step[this.column+1].push({id: id, idBd: step.stepID, name: name, description: step.stepDescription, conditions: [undefined], searchBox: {keywords: [], dd: [], show: false, altoBusqueda: undefined, anchoBusqueda: undefined, altoBarra: undefined, anchoBarra: undefined, placeHolder: "Search..."},
        end: false,backStep: [{column: this.column, row: this.row, condition: i,defaultIndex: undefined}],
        nextStep:  [], deleted: false,conditionIndex: [{true: undefined, conditionName: undefined}]});
    }
    else{
      this.newRow = this.step[this.column][this.row].nextStep[i].row;

      if(!this.step[this.newColumn][this.newRow].deleted){
        this.newRow     = this.step[this.column+1].length

        this.step[this.column+1].push({id: id, idBd: step.stepID, name: name, description: undefined, conditions: [undefined], searchBox: {keywords: [], dd: [], show: false, altoBusqueda: undefined, anchoBusqueda: undefined, altoBarra: undefined, anchoBarra: undefined, placeHolder: "Search..."},
          end: false,backStep: [{column: this.column, row: this.row, condition: i,defaultIndex: undefined}],
          nextStep:  [], deleted: false,conditionIndex: [{true: undefined, conditionName: undefined}]});
      }
      else{
        id =  this.step[this.newColumn][this.newRow].id;

        if(this.step[this.column][this.row].nextStep[i].line != undefined){
          this.step[this.column][this.row].nextStep[i].line.remove();
          this.step[this.column][this.row].nextStep[i].line = undefined;
        }
        this.step[this.newColumn][this.newRow] = {id: id, idBd: step.stepID, name: name, description: undefined, conditions: [undefined],
          end: false, backStep: [{column: this.column, row: this.row, condition: i}], searchBox: {keywords: [], dd: [], show: false, altoBusqueda: undefined, anchoBusqueda: undefined, altoBarra: undefined, anchoBarra: undefined, placeolder: "Search..."},
          nextStep:  this.step[this.newColumn][this.newRow].nextStep, deleted: false, conditionIndex: [{true: undefined, conditionName: undefined}],defaultIndex: undefined}
      }
    }

    this.lastId = id;
  }

  createColumn(i:number, step: any){
    // send_edit_step("funciona")
    let id = this.column + 1 +" 0";
    this.newColumn = this.column +1;
    this.newRow = 0;
    let name = step != undefined ? step.stepName : 'Title of Step'

    //miramos si esta borrado o no (ya que si lo estuvieramos creando nextstep no podría tener nada)
    if(this.step[this.column][this.row].nextStep[i] == undefined || (this.step[this.column][this.row].nextStep[i] != undefined &&
       this.step[this.column][this.row].nextStep[i].row == undefined) ){
      this.step.push([{id: id, idBd: step.stepID, name: name, description: step.stepDescription, conditions: [undefined], searchBox: {keywords: [], dd: [], show: false, altoBusqueda: undefined, anchoBusqueda: undefined, altoBarra: undefined, anchoBarra: undefined, placeHolder: "Search..."},
        end: false, backStep: [{column: this.column, row: this.row, condition: i, defaultIndex: undefined}],
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

        this.step[this.newColumn][this.newRow] = {id: id, idBd: step.stepID, name: name, description: step.stepDescription, conditions: [undefined],
          end: false, backStep: [{column: this.column, row: this.row, condition: i}], searchBox: {keywords: [], dd: [], show: false, altoBusqueda: undefined, anchoBusqueda: undefined, altoBarra: undefined, anchoBarra: undefined, placeHolder: "Search..."},
          nextStep: this.step[this.newColumn][this.newRow].nextStep, deleted: false, conditionIndex: [{true: undefined, conditionName: undefined}],defaultIndex: undefined}
    }

    this.lastId = id;
  }
  getIndexOfFlatStep(column){
    let acum = 1
    for(let index = 0; index<=column ; index++){
      acum += this.step[index].length
    }
    return acum
  }

  loadStep(){
    let self = this
    setTimeout(()=>{
      let index = 0
      self.step[self.column][self.row].conditions.forEach((element: any) => {
        if(element != undefined) (<HTMLInputElement>document.getElementById("Condicion " + index)).value = element;
        index++;
      })
      index = 0;
      this.step[this.column][this.row].conditionIndex.forEach((element) => {
        console.log("b")
        let selectTrue = document.getElementById("true " + index) as HTMLSelectElement;
        if(selectTrue != undefined){
          selectTrue.selectedIndex = element.true ;
        }
        let selectDefault = document.getElementById("next Step") as HTMLSelectElement;
        if(selectDefault != undefined){
          let length = this.step.length
          if(!(this.column +1 > length) && this.step[this.column][this.row].nextStep[0] != undefined){
            let acum = this.getIndexOfFlatStep(this.column);
            console.log(acum)
            selectDefault.selectedIndex = acum
          }
          else{
            selectDefault.selectedIndex = 0
          }
        }
        index++;
      })
    });
  }

}

function drawStepLine(startElement : HTMLInputElement, endElement : HTMLInputElement){
  let line = new LeaderLine({
      start: startElement,
      end: endElement,
      })

  return line
}

function drawConditionalLine(startElement : HTMLInputElement, endElement : HTMLInputElement,label : string){
  let line = new LeaderLine({
    start: startElement,
    end: endElement,
    endLabel: label,
    color: 'rgb(110, 224, 181)'
  })

  return line
}

function drawSelfConditionalLine(startElement : HTMLInputElement, endElement : HTMLInputElement, label : string){
  let line = new LeaderLine({
    start: startElement,
    end: endElement,
    path: "magnet",
    endLabel: label,
    color: 'rgb(110, 224, 181)'
    });

  return line
}

function drawSelfLine(startElement : HTMLInputElement, endElement : HTMLInputElement){
  let line = new LeaderLine({
    start: startElement,
    end: endElement,
    path: "magnet"
    });

  return line
}
