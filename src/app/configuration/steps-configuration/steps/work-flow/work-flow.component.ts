import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import 'leader-line';
import { send_edit_step } from 'src/app/ApiCalls/llamadas-api/llamadas-api.component';
declare let LeaderLine: any;

@Component({
  selector: 'app-work-flow',
  templateUrl: './work-flow.component.html',
  styleUrls: ['./work-flow.component.scss']
})
export class WorkFlowComponent implements OnInit {

  condition : boolean = false;
  lastId    : string;
  newColumn : number;
  newRow    : number;


  @Input() step   : any[][]
  @Input() row    : number
  @Input() column : number

  @Output() chargeIndex = new EventEmitter<any>();
  @Output() removeStep  = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  newCondition(){
    if( this.step[this.column][this.row].conditionIndex[this.step[this.column][this.row].conditionIndex.length-1].conditionName != undefined){
      this.step[this.column][this.row].conditions.push(undefined);
      this.step[this.column][this.row].conditionIndex.push({true: undefined, conditionName: undefined})
    }
  }

  createNextStepWithOutConditions(id){
    send_edit_step("Puede que funcione")
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

  saveNameStepCondition(i) {
    if((<HTMLInputElement>document.getElementById("Condicion "+i)) != undefined){
        let name = (<HTMLInputElement>document.getElementById("Condicion "+i)).value;
        this.step[this.column][this.row].conditionIndex[i].conditionName = name;
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
              this.remove(column,row)
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
    this.changeIndex();
  }

  availableSteps(step){
    let avialableSteps = []

    //Eliminamos los steps borrados para que no puedan ser seleccionados en el comboBox
    step.flat().forEach(element => {
      if(!element.deleted) avialableSteps.push(element)
    });

    return avialableSteps
  }

  createColumn(i){
    // send_edit_step("funciona")
    let id = this.column + 1 +" 0";
    this.newColumn = this.column +1;
    this.newRow = 0;
    let name = 'Title of Step'

    //miramos si esta borrado o no (ya que si lo estuvieramos creando nextstep no podría tener nada)
    if(this.step[this.column][this.row].nextStep[i] == undefined || (this.step[this.column][this.row].nextStep[i] != undefined &&
       this.step[this.column][this.row].nextStep[i].row == undefined) ){
      this.step.push([{id: id, idBd: undefined, name: name, description: undefined, conditions: [undefined], dd: [], keywords: [], searchBox: {keywords: [], dd: [], show: false, altoBusqueda: undefined, anchoBusqueda: undefined, altoBarra: undefined, anchoBarra: undefined, placeHolder: "Search..."},
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

        this.step[this.newColumn][this.newRow] = {id: id, idBd: undefined, name: name, description: undefined, conditions: [undefined],dd: [],keywords: [],
          synonym: [], end: false, backStep: [{column: this.column, row: this.row, condition: i}], searchBox: {keywords: [], dd: [], show: false, altoBusqueda: undefined, anchoBusqueda: undefined, altoBarra: undefined, anchoBarra: undefined, placeHolder: "Search..."},
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
      this.step[this.column+1].push({id: id, idBd: undefined, name: name, description: undefined, conditions: [undefined], dd: [], keywords: [], searchBox: {keywords: [], dd: [], show: false, altoBusqueda: undefined, anchoBusqueda: undefined, altoBarra: undefined, anchoBarra: undefined, placeHolder: "Search..."},
        synonym: [], end: false,backStep: [{column: this.column, row: this.row, condition: i,defaultIndex: undefined}],
        nextStep:  [], deleted: false,conditionIndex: [{true: undefined, conditionName: undefined}]});
    }
    else{
      this.newRow = this.step[this.column][this.row].nextStep[i].row;

      if(!this.step[this.newColumn][this.newRow].deleted){
        this.newRow     = this.step[this.column+1].length

        this.step[this.column+1].push({id: id, idBd: undefined, name: name, description: undefined, conditions: [undefined], dd: [], keywords: [], searchBox: {keywords: [], dd: [], show: false, altoBusqueda: undefined, anchoBusqueda: undefined, altoBarra: undefined, anchoBarra: undefined, placeHolder: "Search..."},
          synonym: [], end: false,backStep: [{column: this.column, row: this.row, condition: i,defaultIndex: undefined}],
          nextStep:  [], deleted: false,conditionIndex: [{true: undefined, conditionName: undefined}]});
      }
      else{
        id =  this.step[this.newColumn][this.newRow].id;

        if(this.step[this.column][this.row].nextStep[i].line != undefined){
          this.step[this.column][this.row].nextStep[i].line.remove();
          this.step[this.column][this.row].nextStep[i].line = undefined;
        }
        this.step[this.newColumn][this.newRow] = {id: id, idBd: undefined, name: name, description: undefined, conditions: [undefined],dd: [],keywords: [],
          synonym: [], end: false, backStep: [{column: this.column, row: this.row, condition: i}], searchBox: {keywords: [], dd: [], show: false, altoBusqueda: undefined, anchoBusqueda: undefined, altoBarra: undefined, anchoBarra: undefined, placeolder: "Search..."},
          nextStep:  this.step[this.newColumn][this.newRow].nextStep, deleted: false, conditionIndex: [{true: undefined, conditionName: undefined}],defaultIndex: undefined}
      }
    }

    this.lastId = id;
  }

  createNextStep(i){
    if(this.step[this.column+1] == undefined ? true : this.step[this.column+1][0].deleted ) this.createColumn(i)
    else this.createStepInColumn(i)
  }

  remove(column,row){
    this.removeStep.emit({column: column, row: row})
  }

  changeIndex(){
    this.chargeIndex.emit();
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

// function changeSelection(index,i){
//   var select = document.getElementById("true "+i) as HTMLSelectElement;
//   select.selectedIndex = index
// }
