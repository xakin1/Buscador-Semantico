import {Component, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, FormControl,FormGroup, Validators,FormArray} from '@angular/forms';
import { LabelsComponent } from 'src/app/shared/labels/labels.component';
import { RulesSynonymHomeComponent } from './rules-synonym-home/rules-synonym-home.component';

/**
 * @title Stepper overview
 */
 @Component({
  selector: 'app-rules-home',
  templateUrl: './rules-home.component.html',
  styleUrls: ['./rules-home.component.scss']
})
export class RulesHomeComponent{

  formGroup : FormGroup;
  form: FormArray;
  info : string = "Regla que, junto las palabras claves, ayudarán a identificar el producto";
  errorName: boolean = false;
  title: string = "Palabras clave que definan al producto";
  placeholder: string = "Nueva palabra clave...";


  @ViewChild('stepper',{static: false}) stepper;
  @ViewChildren(LabelsComponent) listOfLabels;
  @ViewChildren(RulesSynonymHomeComponent) listOfSynonym;

  steps = [{ title: null, value: null, completed: false, display: false, synonym: null }];
  allCompleted = false;
  constructor(private _formBuilder: FormBuilder) {
  }

  init(){
    return this._formBuilder.group({
      cont :new FormControl('', [Validators.required]),
    })
  }

  ngOnInit() {
     this.formGroup = this._formBuilder.group({
       Ctrl: ['', Validators.required]
    });
  }

  addItem() {
    this.steps.push({ title: null, value: null, completed: false, display: false, synonym: []});
    this.stepper.selectedIndex = this.steps.length - 1;
    this.allCompleted = false;
  }

  changeStepSelection(event, index) {
    setTimeout(() =>{
      this.stepper.selectedIndex = this.steps.length;
    },0);
    this.saveName(index)
    this.allCompleted = true;
  }

  saveName(index) {
    this.steps[index].synonym =  this.listOfSynonym._results[index].listOfLabels.labels
    console.log(this.steps[index].synonym.length);
      if ((<HTMLInputElement>document.getElementById("Title")))
        this.steps[index].title =  (<HTMLInputElement>document.getElementById("Title")).value;
      this.steps[index].display = true
  }


  onRemoveAll() {
    this.steps = [];
    this.stepper.selectedIndex = this.steps.length;
    this.allCompleted = true;
  }

  removeStep(i){
    if(this.steps.length < i + 1){return;}
    this.steps.splice(i,1);
    this.stepper.selectedIndex = this.steps.length;
    this.checkCompleted();
  }

  edit(i){
    this.stepper[i].display = false;
  }

  checkCompleted(){
    this.allCompleted = this.steps.every(step => step.completed);
  }

  }
