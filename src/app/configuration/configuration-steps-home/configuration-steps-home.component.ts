import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormControl,FormGroup, Validators,FormArray} from '@angular/forms';
import { InputTextComponent } from '../steps-components/input-text/input-text.component';
import { LabelsComponent } from '../steps-components/labels/labels.component';

/**
 * @title Stepper overview
 */
 @Component({
  selector: 'app-configuration-steps-home',
  templateUrl: './configuration-steps-home.component.html',
  styleUrls: ['./configuration-steps-home.component.scss']
})
export class ConfigurationStepsHomeComponent implements OnInit {
  isLinear = false;
  formGroup : FormGroup;
  form: FormArray;

  @ViewChild("viewContainerRef", { read: ViewContainerRef, static : false })
  VCR: ViewContainerRef
  constructor(private _formBuilder: FormBuilder,private CFR: ComponentFactoryResolver) {}
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

  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      form : this._formBuilder.array([this.init()])
    })
    this.addItem();
  }

  init(){
    return this._formBuilder.group({
      cont :new FormControl('', [Validators.required]),
    })
  }

  addItem(){
    this.form = this.formGroup.get('form') as FormArray;
    this.form.push(this.init());
  }

  get formData (){ return this.form.get('Data'); }
}
