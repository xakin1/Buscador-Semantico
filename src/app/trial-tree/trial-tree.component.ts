import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, ContentChild, OnInit, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { EndComponent } from '../shared/components/end/end.component';
import { PlusComponent } from '../shared/components/plus/plus.component';
import { StepConditionalFalseSelfComponent } from './step-conditional-false-self/step-conditional-false-self.component';
import { StepConditionalTrueSelfComponent } from './step-conditional-true-self/step-conditional-true-self.component';
import { StepConditionalComponent } from './step-conditional/step-conditional.component';
import { StepPlusComponent } from './step-plus/step-plus.component';

@Component({
  selector: 'app-trial-tree',
  templateUrl: './trial-tree.component.html',
  styleUrls: ['./trial-tree.component.scss']
})
export class TrialTreeComponent implements OnInit {
  open: boolean = true;
  @ViewChildren(StepPlusComponent) stepPLus;
  @ViewChild("viewContainerRefLeft", { read: ViewContainerRef, static : false }) VCRL: ViewContainerRef
  @ViewChild("viewContainerRefRight", { read: ViewContainerRef, static : false }) VCRR: ViewContainerRef
  @ContentChild(StepPlusComponent,{static: false}) step: StepPlusComponent;
  componentsReferences = Array<ComponentRef<any>>()
  child_unique_key: number = -1;
  index: number = 0;
  edit: boolean = false;
  condicionalfalse = "condicional false"
  condicionaltrue  = "condicional true"
  condicional  = "condicional"
  position: string;

  infoKeywords: string = "Hacer click en una etiqueta para desplegar el diccionario de datos"
  info : string = "Regla que, junto las palabras claves, ayudarán a identificar el producto";
  errorName: boolean = false;
  title: string = "Palabras clave que definan al producto";
  placeholder: string = "Nueva palabra clave...";

  openSideBar(index){
    this.open=true
    this.index = index
    this.edit = false
  }

  infoSynonym: string = "Lista de sinónimos que permitirá de igual manera identificar el paso correspondiente";
  titleSynonym: string = "Listado de sinónimo";
  placeholderSynonym: string = "Nuevo sinónimo...";
  widthSynonym: number = 100;

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {

  }

  // ngAfterViewInit(): void {

  // }
  toggleSidebar(){
    this.open = false;
    if((<HTMLInputElement>document.getElementById("Title")) != undefined) this.componentsReferences[this.index].instance.titleStep =  (<HTMLInputElement>document.getElementById("Title")).value;
  }

  createStepPlus() {
    let componentFactory = this.resolver.resolveComponentFactory(StepPlusComponent);

    let childComponentRef = undefined;;

    let childComponent = undefined;
    let position = this.componentsReferences[this.index] ? this.componentsReferences[this.index].instance.position : undefined;
    if( position != undefined){
      if( position == "left"){
        childComponentRef       = this.VCRL.createComponent(componentFactory);
        childComponent          = childComponentRef.instance;
        childComponent.nor      = this.componentsReferences[this.index].instance.childNor;
        childComponent.nol      = this.componentsReferences[this.index].instance.childNol;
        childComponent.childNol = this.componentsReferences[this.index].instance.childNol
        childComponent.childNor = this.componentsReferences[this.index].instance.childNor
        childComponent.position = this.componentsReferences[this.index].instance.position;
        childComponent.left     = true
      }
      else if (position == "right"){
        childComponentRef       = this.VCRR.createComponent(componentFactory);
        childComponent          = childComponentRef.instance;
        childComponent.nor      = this.componentsReferences[this.index].instance.childNor;
        childComponent.nol      = this.componentsReferences[this.index].instance.childNol;
        childComponent.childNol = this.componentsReferences[this.index].instance.childNol
        childComponent.childNor = this.componentsReferences[this.index].instance.childNor
        childComponent.position = this.componentsReferences[this.index].instance.position;
        childComponent.right    = true
      }
    }
    else{
      childComponentRef = this.VCRL.createComponent(componentFactory);
      childComponent = childComponentRef.instance;
    }

    childComponent.unique_key = ++this.child_unique_key;
    childComponent.parentRef = this;
    this.index = childComponent.unique_key

    childComponent.open.subscribe((event) => {
      this.openSideBar(childComponent.unique_key);
    });

    childComponent.edit.subscribe((event) => {
      this.edit = true;
      this.open = true;
      this.index = childComponent.unique_key;
    });

    // add reference for newly created component
    this.componentsReferences.splice(this.index,0,childComponentRef);

    this.toggleSidebar();
  }

  createStepConditionalTrue() {
    let componentFactory = this.resolver.resolveComponentFactory(StepConditionalTrueSelfComponent);

    let childComponentRef = undefined;;

    let childComponent = undefined;

    let position = this.componentsReferences[this.index] ? this.componentsReferences[this.index].instance.position : undefined;
    if(position == "left"){
      childComponentRef = this.VCRL.createComponent(componentFactory);
      childComponent = childComponentRef.instance;

      childComponent.left = true
      childComponent.nor      = this.componentsReferences[this.index].instance.childNor;
      childComponent.nol      = this.componentsReferences[this.index].instance.childNol;
      childComponent.childNol = this.componentsReferences[this.index].instance.childNol - 1
      childComponent.childNor = this.componentsReferences[this.index].instance.childNor - 1
      childComponent.position = this.componentsReferences[this.index].instance.position;
    }
    else if (position == "right"){
      childComponentRef = this.VCRR.createComponent(componentFactory);
      childComponent = childComponentRef.instance;

      childComponent.right = true

      childComponent.nor      = this.componentsReferences[this.index].instance.childNor;
      childComponent.nol      = this.componentsReferences[this.index].instance.childNol;
      childComponent.childNor = this.componentsReferences[this.index].instance.childNor + 1
      childComponent.childNol = this.componentsReferences[this.index].instance.childNol - 1
      childComponent.position = this.componentsReferences[this.index].instance.position;
    }
    else{
      childComponentRef = this.VCRL.createComponent(componentFactory);
      childComponent = childComponentRef.instance;
      childComponent.position = "right";
    }

    childComponent.unique_key = ++this.child_unique_key;
    childComponent.parentRef = this;
    this.index = childComponent.unique_key

    childComponent.open.subscribe(($event) => {
      this.position = this.componentsReferences[this.index].instance.position;
      this.openSideBar(childComponent.unique_key);
    });

    childComponent.edit.subscribe((event) => {
      this.edit = true;
      this.open = true;
      this.index = childComponent.unique_key;
    });

    // add reference for newly created component
    this.componentsReferences.splice(this.index,0,childComponentRef);

    this.toggleSidebar();
  }

  createStepConditionalFalse() {
    let componentFactory = this.resolver.resolveComponentFactory(StepConditionalFalseSelfComponent);

    let childComponentRef = undefined;;

    let childComponent = undefined;
    let position = this.componentsReferences[this.index] ? this.componentsReferences[this.index].instance.position : undefined;
    if(position == "left"){

      childComponentRef = this.VCRL.createComponent(componentFactory);
      childComponent = childComponentRef.instance;

      childComponent.right = this.position == "right"
      childComponent.left = this.position == "left"

      childComponent.nor      = this.componentsReferences[this.index].instance.childNor;
      childComponent.nol      = this.componentsReferences[this.index].instance.childNol;
      childComponent.childNol = this.componentsReferences[this.index].instance.childNol + 1
      childComponent.childNor = this.componentsReferences[this.index].instance.childNor - 1
      childComponent.position = this.componentsReferences[this.index].instance.position;
    }
    else if (position == "right"){
      childComponentRef = this.VCRR.createComponent(componentFactory);
      childComponent = childComponentRef.instance;

      if( this.position == "right"){
        childComponent.right = true;
        childComponent.childNor = this.componentsReferences[this.index].instance.childNor - 1
        childComponent.childNol = this.componentsReferences[this.index].instance.childNol - 1
      }
      if( this.position == "left"){
        childComponent.left = "left"
        childComponent.childNor = this.componentsReferences[this.index].instance.childNor - 1
        childComponent.childNol = this.componentsReferences[this.index].instance.childNol + 1
      }

      childComponent.nor      = this.componentsReferences[this.index].instance.childNor;
      childComponent.nol      = this.componentsReferences[this.index].instance.childNol;
      childComponent.position = this.componentsReferences[this.index].instance.position;
    }
    else{
      childComponentRef = this.VCRL.createComponent(componentFactory);
      childComponent = childComponentRef.instance;
      childComponent.position ="left";
    }

    childComponent.unique_key = ++this.child_unique_key;
    childComponent.parentRef = this;
    this.index = childComponent.unique_key

    childComponent.open.subscribe(($event) => {
      this.position = $event;
      this.openSideBar(childComponent.unique_key);
    });

    childComponent.edit.subscribe((event) => {
      this.edit = true;
      this.open = true;
      this.index = childComponent.unique_key;
    });

    // add reference for newly created component
    this.componentsReferences.splice(this.index,0,childComponentRef);

    this.toggleSidebar();
  }

  createStepConditional() {
    let componentFactory = this.resolver.resolveComponentFactory(StepConditionalComponent);

    let childComponentRef = undefined;;

    let childComponent = undefined;

    let position = this.componentsReferences[this.index] ? this.componentsReferences[this.index].instance.position : undefined;
    if(position == "left"){
      childComponentRef = this.VCRL.createComponent(componentFactory);
      childComponent = childComponentRef.instance;
      childComponent.left = true
      childComponent.nor      = this.componentsReferences[this.index].instance.childNor;
      childComponent.nol      = this.componentsReferences[this.index].instance.childNol;
      childComponent.childNol = this.componentsReferences[this.index].instance.childNol + 1
      childComponent.childNor = this.componentsReferences[this.index].instance.childNor - 1
      childComponent.position = this.componentsReferences[this.index].instance.position;
    }
    else if (position == "right"){
      childComponentRef = this.VCRR.createComponent(componentFactory);
      childComponent = childComponentRef.instance;

      childComponent.right = true

      childComponent.nor      = this.componentsReferences[this.index].instance.childNor;
      childComponent.nol      = this.componentsReferences[this.index].instance.childNol;
      childComponent.childNor = this.componentsReferences[this.index].instance.childNor + 1
      childComponent.childNol = this.componentsReferences[this.index].instance.childNol - 1
      childComponent.position = this.componentsReferences[this.index].instance.position;
    }
    else{
      childComponentRef = this.VCRL.createComponent(componentFactory);
      childComponent = childComponentRef.instance;
      childComponent.position = "left";
    }




    childComponent.unique_key = ++this.child_unique_key;
    childComponent.parentRef = this;
    this.index = childComponent.unique_key

    childComponent.open.subscribe(($event) => {
      this.position = $event;
      childComponent.position = $event
      this.openSideBar(childComponent.unique_key);
    });

    childComponent.edit.subscribe((event) => {
      this.edit = true;
      this.open = true;
      this.index = childComponent.unique_key;
    });

    // add reference for newly created component
    this.componentsReferences.splice(this.index,0,childComponentRef);

    this.toggleSidebar();
  }

  saveNameStep() {
    if((<HTMLInputElement>document.getElementById("Title")) != undefined) this.componentsReferences[this.index].instance.titleStep =  (<HTMLInputElement>document.getElementById("Title")).value;
  }



}
