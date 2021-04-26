import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl,FormGroup, Validators,FormArray} from '@angular/forms';

/**
 * @title Stepper overview
 */
 @Component({
  selector: 'app-configuration-steps-home',
  templateUrl: './configuration-steps-home.component.html',
  styleUrls: ['./configuration-steps-home.component.scss']
})
export class ConfigurationStepsHomeComponent{

  formGroup : FormGroup;
  form: FormArray;

  RandomFormGroup: FormGroup;
  @ViewChild('stepper',{static: false}) stepper;
  stepOptions = [
    { label: 'Buscar como seleccionar', value: '1' }
  ]
  steps = [{ title: null, value: null, completed: false }];
  allCompleted = false;
  procedureFinished:boolean = false
  constructor(private _formBuilder: FormBuilder) {}



  init(){
    return this._formBuilder.group({
      cont :new FormControl('', [Validators.required]),
    })
  }

  ngOnInit() {
     this.RandomFormGroup = this._formBuilder.group({
       Ctrl: ['', Validators.required]
    });
  }

  addItem() {
    this.steps.push({ title: null, value: null, completed: false });
    this.stepper.selectedIndex = this.steps.length - 1;
    this.allCompleted = false;
  }

  changeStepSelection(event, index) {
    setTimeout(() =>{
      this.stepper.selectedIndex = this.steps.length;
    },0);
    this.steps[index].completed = true;
    this.allCompleted = true;
  }

  saveName(index) {
    this.steps[index].title =  (<HTMLInputElement>document.getElementById("TitleInput")).value;
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

  checkCompleted(){
    this.allCompleted = this.steps.every(step => step.completed);
  }

  handleDone(){
    this.procedureFinished = true;
  }

  handleReset(){
    this.procedureFinished = false;
    this.steps = [];
    this.steps.push({ title: null, value: null, completed: false });
    this.allCompleted = false;
  }


  }
