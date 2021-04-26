import {Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef} from '@angular/core';
import { FormGroup,FormArray} from '@angular/forms';
import { InputTextComponent } from '../../steps-components/input-text/input-text.component';
import { LabelsComponent } from '../../steps-components/labels/labels.component';

@Component({
  selector: 'app-inputs-home',
  templateUrl: './inputs-home.component.html',
  styleUrls: ['./inputs-home.component.scss']
})
export class InputsHomeComponent{

  formGroup : FormGroup;
  form: FormArray;

  @ViewChild("viewContainerRef", { read: ViewContainerRef, static : false })
  VCR: ViewContainerRef
  RandomFormGroup: FormGroup;
  @ViewChild('stepper',{static: false}) stepper;
  stepOptions = [
    { label: 'Buscar como seleccionar', value: '1' },
  ]
  steps = [{ title: null, value: null, completed: false }];
  allCompleted = false;
  procedureFinished:boolean = false
  constructor(private CFR: ComponentFactoryResolver) {}
  child_unique_key: number = 0;
  componentsReferences = Array<ComponentRef<any>>()
  componentRef: any;



  createLabelsComponent() {
    let componentFactory = this.CFR.resolveComponentFactory(LabelsComponent);

    let childComponentRef = this.VCR.createComponent(componentFactory);

    let childComponent = childComponentRef.instance;
    childComponent.unique_key = ++this.child_unique_key;
    childComponent.parentRef = this;

    // add reference for newly created component
    this.componentsReferences.push(childComponentRef);
  }

  createInputTextComponent() {
    let componentFactory = this.CFR.resolveComponentFactory(InputTextComponent);

    let childComponentRef = this.VCR.createComponent(componentFactory);

    let childComponent = childComponentRef.instance;
    childComponent.unique_key = ++this.child_unique_key;
    childComponent.parentRef = this;

    // add reference for newly created component
    this.componentsReferences.push(childComponentRef);
  }

  destroyComponent() {
      this.componentRef.destroy();
  }

  }

