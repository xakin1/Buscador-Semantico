import { ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { StepBoxComponent } from 'src/app/shared/components/step-box/step-box.component';
import 'leader-line';
import { StepBoxRightComponent } from 'src/app/shared/components/step-box-right/step-box-right.component';
import { ColumnComponent } from 'src/app/shared/components/column/column.component';
declare let LeaderLine: any;


export interface Step {
  title: string,
  synonym: any,
  keywords: any,
  dd: any,
  conditions: any
}


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
  index: number = 0;
  column: number = 0;
  position: number =0;

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

  @ViewChild("viewContainer", { read: ViewContainerRef, static : false }) VCR: ViewContainerRef
  componentsReferences = Array<ComponentRef<any>>()

  steps: Step[] = [];


  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  saveNameStep() {
    if((<HTMLInputElement>document.getElementById("Title")) != undefined){
      if(this.index == 0){
        this.componentsReferences[this.index].instance.titleStep =  (<HTMLInputElement>document.getElementById("Title")).value;
      }
      else{
        console.log("column "+ this.column + " index "+ this.index)
        console.log(this.componentsReferences[0].instance)
        this.componentsReferences[0].instance.componentsReferences[this.column].instance.steps[this.position].name =  (<HTMLInputElement>document.getElementById("Title")).value;
      }
    }
  }

  saveCondition(i) {
    if((<HTMLInputElement>document.getElementById("Condicion " + i)) != undefined){
        this.createNextStep((<HTMLInputElement>document.getElementById("Condicion " + i)).value);
        if( this.steps[this.index].conditions[i] != undefined)  this.steps[this.index].conditions[i] = (<HTMLInputElement>document.getElementById("Condicion " + i)).value;
        else this.steps[this.index].conditions.push((<HTMLInputElement>document.getElementById("Condicion " + i)).value);

    }

  }

  newCondition(){
    console.log(this.steps)
    this.steps[this.index].conditions.push('');
  }

  toggleSidebar(){
    this.open = false;
    this.saveNameStep();
  }

  createStep(){

    let componentFactory = this.resolver.resolveComponentFactory(StepBoxComponent);

    let childComponentRef  = this.VCR.createComponent(componentFactory);
    let childComponent     = childComponentRef.instance;
    childComponent.unique_key = ++this.child_unique_key;

    childComponent.edit.subscribe(($event) => {
      this.edit = true;
      this.open = true;
      this.index = $event.index;
      this.column = $event.column;
      this.position = $event.position

      if(this.steps[this.index] != undefined) this.conditionOfselectedStep = this.steps[this.index].conditions;
      else this.conditionOfselectedStep = [];

      if((<HTMLInputElement>document.getElementById("Title")) != undefined){
        if(this.index == 0){
          (<HTMLInputElement>document.getElementById("Title")).value = this.componentsReferences[this.index].instance.titleStep;

        }
        else{
          (<HTMLInputElement>document.getElementById("Title")).value = this.componentsReferences[0].instance.componentsReferences[this.column].instance.steps[this.position].name
        }
      }
    });

    this.steps.push({
      title:  '',
      synonym: [],
      keywords: [], dd: [],
      conditions: []})

    // add reference for newly created component
    this.toggleSidebar();

    this.componentsReferences.push(childComponentRef)

  }


  createColumnN(key){
    let componentFactory = this.resolver.resolveComponentFactory(ColumnComponent);

    let childComponentRef  = this.VCR.createComponent(componentFactory);
    let childComponent     = childComponentRef.instance;
    childComponent.unique_key = key+1;
    this.componentsReferences.push(childComponentRef);
    this.componentsReferences[childComponent.unique_key].instance.steps.push({id: key, name: 'Title of Step', haveNext: false});

  }

  public createStepN(index,key) {

  }

  createColumn(label){
     this.createColumnN(this.child_unique_key)

      setTimeout(()=>{
        new LeaderLine({
        start: (<HTMLInputElement>document.getElementById(this.index+"")),
        end: (<HTMLInputElement>document.getElementById(""+ this.child_unique_key)),
        endLabel: label
        });
      });

      this.toggleSidebar();
  }

  createStepInColumn(vector,label){
    vector.createStep(this.index,++this.child_unique_key+'');
    setTimeout(()=>{
      new LeaderLine({
      start: (<HTMLInputElement>document.getElementById(this.index+"")),
      end: (<HTMLInputElement>document.getElementById(""+this.child_unique_key)),
      endLabel: label
      });
    });
    this.toggleSidebar();
  }

  // createColumn(label){
  //     this.componentsReferences[0].instance.createColumn(this.child_unique_key)


  //     this.componentsReferences[0].instance.createStep(this.index,++this.child_unique_key+'')

  //     setTimeout(()=>{
  //       new LeaderLine({
  //       start: (<HTMLInputElement>document.getElementById(this.index+"")),
  //       end: (<HTMLInputElement>document.getElementById(""+ this.child_unique_key)),
  //       endLabel: label
  //       });
  //     });

  //     this.toggleSidebar();
  // }

  // createStepInColumn(vector,label){
  //   vector.createStep(this.index,++this.child_unique_key+'');
  //   setTimeout(()=>{
  //     new LeaderLine({
  //     start: (<HTMLInputElement>document.getElementById(this.index+"")),
  //     end: (<HTMLInputElement>document.getElementById(""+this.child_unique_key)),
  //     endLabel: label
  //     });
  //   });
  //   this.toggleSidebar();
  // }

  createNextStep(label){

    if(this.index >= 1){
      if(this.componentsReferences[0].instance.componentsReferences[this.column].instance.steps[this.position].haveNext == false){
        this.componentsReferences[0].instance.componentsReferences[this.column].instance.steps[this.position].haveNext = true
        this.createColumn(label)
      }
      else {
        this.createStepInColumn(this.componentsReferences[0].instance,label)
      }

    }
    else{
      if(this.componentsReferences[0].instance.haveNext == false){
        this.componentsReferences[0].instance.haveNext = true
        this.createColumn(label)
      }
      else {
        this.createStepInColumn(this.componentsReferences[0].instance,label)
      }
    }

    this.steps.push({
      title:  '',
      synonym: [],
      keywords: [], dd: [],
      conditions: []})
  }



}
