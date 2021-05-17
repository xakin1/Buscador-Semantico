import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl,FormGroup, Validators,FormArray} from '@angular/forms';
import { title } from 'process';

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
  info : string = "Informacion util sobre lo que son estos steps";

  @ViewChild('stepper',{static: false}) stepper;

  steps = [{ title: null, value: null, completed: false, display: false }];
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
    this.steps.push({ title: null, value: null, completed: false, display: false});
    this.stepper.selectedIndex = this.steps.length - 1;
    this.allCompleted = false;
  }

  changeStepSelection(event, index) {
    setTimeout(() =>{
      this.stepper.selectedIndex = this.steps.length;
    },0);
    this.saveName(index)
    this.steps[index].completed = true;
    this.allCompleted = true;


  }

  saveName(index) {
    if( (<HTMLInputElement>document.getElementById("Title")) != undefined){
      this.steps[index].title =  (<HTMLInputElement>document.getElementById("Title")).value;
      this.steps[index].display = true;
    }
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
