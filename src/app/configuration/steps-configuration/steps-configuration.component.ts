import { ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { StepBoxComponent } from 'src/app/shared/components/step-box/step-box.component';
import 'leader-line';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LabelsComponent } from 'src/app/shared/components/labels/labels.component';
import { DdComponent } from 'src/app/shared/components/dd/dd.component';
import { ActivatedRoute, Router } from '@angular/router';
import { configFlujoDeDatos, configKeywords, configSearchBox, configSemantic, configSinonimos, configSteps} from 'src/app/app.component';
import { send_edit_step, send_get_command } from 'src/app/ApiCalls/llamadas-api/llamadas-api.component';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material';
import { Sidebar } from 'ng-sidebar';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';

export interface Command{
  commandDescription : string,
  commandName        : string,
  type               : string,
  commandID          : any,
  steps              : any;
}

@Component({
  selector: 'app-steps-configuration',
  templateUrl: './steps-configuration.component.html',
  styleUrls: ['./steps-configuration.component.scss']
})

export class StepsConfigurationComponent implements OnInit {
  open: boolean = true;
  edit: boolean = false;

  iterationSave : boolean = false;
  similarName   : boolean = false;
  question      : boolean = false;
  stopWord      : boolean = false;

  row   : number  = 0;
  column: number  = 0;

  info        : string  = "Regla que, junto las palabras claves, ayudarán a identificar el producto";

  child_unique_key   : number  = -1;
  accesiblestep      : any     = undefined;

  tree      : any;
  step      : any     = undefined;

  openedSearchBox: boolean = false;
  labelButtonSearchBox = ">"

  lastIndexTrue : number
  lastIndexFalse: number

  commandId : string;

  show                = false;
  configSteps         = true;
  configSearchBox     = false;
  configSemantic      = false;
  configSinonimos     = false;
  configKeywords      = false;
  configFlujoDeDatos  = false;

  @ViewChild("viewContainer", { read: ViewContainerRef, static : false }) VCR: ViewContainerRef
  @ViewChild("keywords", { read: ViewContainerRef, static : false }) keyword: LabelsComponent
  @ViewChild("keywordsSearchBox", { read: ViewContainerRef, static : false }) keywordsSearchBox: LabelsComponent
  @ViewChild("synonym", { read: ViewContainerRef, static : false }) synonym: LabelsComponent
  @ViewChild("dd", { read: ViewContainerRef, static : false }) dd: DdComponent
  @ViewChild("sidebar", { read: ViewContainerRef, static : false }) sidebar: SidebarComponent

  formGroup : FormGroup;
  display   : boolean = false;
  vacio     : boolean = true;

  minResultados:number = 0

  treeData = [
    {
      name: 'Configuración de pasos',
      children: [ { name: 'General'}, { name: 'Sinónimos'}, {name: 'Palabras clave'}, {name: 'Flujo de datos'}]
    },
    {
      name: 'Buscador Semántico',
      children: [ {name: 'Configurar Barra de búsqueda'}, {name: 'Configurar Buscador semántico'}]
    }
  ];

  title = 'Buscador-semantico';
  opened: boolean = false;
  baseUrl = window.location.origin+"/xaquin/"

  constructor(private route: ActivatedRoute,private resolver: ComponentFactoryResolver,private _formBuilder: FormBuilder) {
  }

  init(){
    return this._formBuilder.group({
      cont :new FormControl('', [Validators.required]),
    })
  }

  async ngOnInit() {
     this.formGroup = this._formBuilder.group({
       Ctrl: ['', Validators.required]
    });
    this.route.params.subscribe( params =>  this.commandId = params.id);
    let command = await send_get_command(this.commandId)
    this.createStep(command[0].steps[0])

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

  ngOnDestroy() {
    if(this.step != undefined)
      this.removeNextStep(0,0, undefined, undefined)
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
        if(element != undefined) (<HTMLInputElement>document.getElementById("Condicion " + index)).value = element;
        index++;
      })
    });

    setTimeout(()=>{
      this.chargeIndex();
      if(<HTMLInputElement>document.getElementById("Title") != undefined)
        (<HTMLInputElement>document.getElementById("Title")).value = this.step[this.column][this.row].name

      if((<HTMLInputElement>document.getElementById("descripcion")) != undefined)
        (<HTMLInputElement>document.getElementById("descripcion")).value = this.step[this.column][this.row].description != undefined ? this.step[this.column][this.row].description : "";
    })
  }

  createEnd(){
    let startElement = (<HTMLInputElement>document.getElementById(this.column +" "+this.row));
    this.tree.end(this.column,this.row, startElement)
  }

  createStep(step: any){
    console.log("aqui");
    let name = "Title of Step";
    this.vacio = false;

    // send_edit_step(name)
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

      childComponent.columns.push([{id: this.column+" "+this.row, idBd: step.stepID , name: step.stepName, description: step.stepDescription,
        conditions: [undefined],dd: [],keywords: [], synonym: [], end: false, searchBox: {keywords: [], dd: [], show: false, altoBusqueda: undefined, anchoBusqueda: undefined, altoBarra: undefined, anchoBarra: undefined, placeHolder: "Search..."},
        backStep: [], nextStep: [], deleted: false, conditionIndex: [{true: undefined, conditionName: undefined}], defaultIndex: undefined }])

      this.step = childComponent.columns;
      this.tree = childComponent;
    }
    else{
      this.step[0][0] = {id: this.step[0][0].id, idBd: undefined, name: name, description: undefined,
      conditions: [undefined],dd: [],keywords: [], synonym: [], end: false, searchBox: {keywords: [], dd: [], show: false, altoBusqueda: undefined, anchoBusqueda: undefined, altoBarra: undefined, anchoBarra: undefined, placeHolder: "Search..."},
      backStep:[], nextStep: this.step[0][0].nextStep, deleted: false, conditionIndex: [{true: undefined, conditionName: undefined}], defaultIndex: undefined}
    }
    this.closeNav();
  }

  changeLabelOfLine(i,label){
    this.step[this.column][this.row].lineConditions[i].setOptions({endLabel: label})
  }

  saveStep() {
      this.step[this.column][this.row].keyword = this.keyword != undefined ? this.keyword.labels : [];
      this.step[this.column][this.row].synonym = this.synonym != undefined ? this.synonym.labels : [];

      this.saveNameStep()
  }

  saveNameStep() {
    if((<HTMLInputElement>document.getElementById("Title")) != undefined){
        let name = (<HTMLInputElement>document.getElementById("Title")).value;

        name = name == undefined ? '' : name
        this.step[this.column][this.row].name = name;
    }

    if((<HTMLInputElement>document.getElementById("descripcion")) != undefined){
      let descripcion = (<HTMLInputElement>document.getElementById("descripcion")).value;

      descripcion = descripcion == undefined ? '' : descripcion
      this.step[this.column][this.row].description = descripcion;
    }
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
      this.closeNav();
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
