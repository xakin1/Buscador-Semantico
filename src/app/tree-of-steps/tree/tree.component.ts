import { ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { StepBoxComponent } from 'src/app/shared/components/step-box/step-box.component';
import 'leader-line';
import { StepBoxRightComponent } from 'src/app/shared/components/step-box-right/step-box-right.component';
import { ColumnComponent } from 'src/app/shared/components/column/column.component';
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
  position: string;
  child_unique_key: number = -1;
  index: number = 0;

  infoKeywords: string = "Hacer click en una etiqueta para desplegar el diccionario de datos"
  info : string = "Regla que, junto las palabras claves, ayudarán a identificar el producto";
  errorName: boolean = false;
  title: string = "Palabras clave que definan al producto";
  placeholder: string = "Nueva palabra clave...";


  infoSynonym: string = "Lista de sinónimos que permitirá de igual manera identificar el paso correspondiente";
  titleSynonym: string = "Listado de sinónimo";
  placeholderSynonym: string = "Nuevo sinónimo...";
  widthSynonym: number = 100;

  @ViewChild("viewContainer", { read: ViewContainerRef, static : false }) VCR: ViewContainerRef
  componentsReferences = Array<ComponentRef<any>>()


  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  saveNameStep() {
    if((<HTMLInputElement>document.getElementById("Title")) != undefined){
      if(this.index == 0){
        this.componentsReferences[this.index].instance.titleStep =  (<HTMLInputElement>document.getElementById("Title")).value;
      }
      else{
        this.componentsReferences[0].instance.componentsReferences[this.index-1].instance.titleStep =  (<HTMLInputElement>document.getElementById("Title")).value;
      }
    }
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
      this.index = $event;
      if((<HTMLInputElement>document.getElementById("Title")) != undefined){
        if(this.index == 0){
          (<HTMLInputElement>document.getElementById("Title")).value = this.componentsReferences[this.index].instance.titleStep;
        }
        else{
          (<HTMLInputElement>document.getElementById("Title")).value = this.componentsReferences[0].instance.componentsReferences[this.index-1].instance.titleStep;
        }
      }
    });

    // add reference for newly created component
    this.toggleSidebar();

    this.componentsReferences.push(childComponentRef)

  }

  array(vector){

    if(vector.instance.haveNext == false){
      vector.instance.haveNext = true
      this.componentsReferences[0].instance.createColumn(this.child_unique_key)


      this.componentsReferences[0].instance.createStep(this.index,++this.child_unique_key+'')


      // let componentFactory = this.resolver.resolveComponentFactory(ColumnComponent);
      // let childComponentRef  = this.VCR.createComponent(componentFactory);
      // let childComponent     = chil/ column.createStedComponentRef.instance;
      // /p(this.child_unique_key);
      // this.child_unique_key++;
      //   // add reference for newly created component
      // this.toggleSidebar();

      setTimeout(()=>{
        new LeaderLine({
        start: (<HTMLInputElement>document.getElementById(this.index+"")),
        end: (<HTMLInputElement>document.getElementById(""+ this.child_unique_key))
        });
      });

      // this.componentsReferences.push(childComponentRef)
      // let componentFactory = this.resolver.resolveComponentFactory(StepBoxComponent)

      // this.componentsReferences[this.index].instance.haveNext = true
      // let childComponentRef  = this.VCR.createComponent(componentFactory);
      // let childComponent     = childComponentRef.instance;
      // childComponent.unique_key = ++this.child_unique_key;
      // // childComponent.open.subscribe((event) => {
      // //   this.openSideBar(childComponent.unique_key);
      // // });

      // childComponent.edit.subscribe((event) => {
      //   this.edit = true;
      //   this.index = childComponent.unique_key;
      //   this.open = true;
      // });

      // this.toggleSidebar();
      // setTimeout(()=>{
      //   new LeaderLine({
      //   start: (<HTMLInputElement>document.getElementById(this.index+"")),
      //   end: (<HTMLInputElement>document.getElementById(""+childComponent.unique_key))
      //   });
      // });
      this.toggleSidebar();
    }
    else{
      vector.instance.createStep(this.index,++this.child_unique_key+'');
      setTimeout(()=>{
        new LeaderLine({
        start: (<HTMLInputElement>document.getElementById(this.index+"")),
        end: (<HTMLInputElement>document.getElementById(""+this.child_unique_key))
        });
      });
      this.toggleSidebar();
    }
  }

  createNextStep(){

    if(this.index >= 1){
      this.array(this.componentsReferences[0].instance.componentsReferences[this.index-1])
    }
    else{
      this.array(this.componentsReferences[0])
    }
  }



}
