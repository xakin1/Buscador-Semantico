import { C } from '@angular/cdk/keycodes';
import { Component, ComponentFactoryResolver, ComponentRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { ColumnComponent } from '../column/column.component';
import { StepBoxRightComponent } from '../step-box-right/step-box-right.component';

@Component({
  selector: 'app-step-box',
  templateUrl: './step-box.component.html',
  styleUrls: ['./step-box.component.scss']
})
export class StepBoxComponent implements OnInit {


  @Output() edit = new EventEmitter<any>();
  @Input("titleStep") titleStep = "Title of Step"
  constructor(private resolver: ComponentFactoryResolver) { }
  public unique_key: number = 0;
  public haveNext = false;
  open: boolean = true;
  edited: boolean = false;
  index : number = 0;

  @ViewChild("viewContainer", { read: ViewContainerRef, static : false }) VCR: ViewContainerRef
  componentsReferences = Array<ComponentRef<any>>()

  ngOnInit() {
  }

  editStep(){
    this.edit.emit({column: 0, index:this.unique_key});
  }

  createColumn(key){

    let componentFactory = this.resolver.resolveComponentFactory(ColumnComponent);

    let childComponentRef  = this.VCR.createComponent(componentFactory);
    let childComponent     = childComponentRef.instance;
    childComponent.unique_key = key+1;
    this.componentsReferences.push(childComponentRef);
    childComponent.edit.subscribe(($event) => {
      this.edit.emit({column: childComponent.unique_key-1, index: $event.index, position: $event.position})
    });
  }

  public createStep(index,key) {
    this.componentsReferences[index].instance.steps.push({id: key, name: 'Title of Step', haveNext: false});
  }


}
