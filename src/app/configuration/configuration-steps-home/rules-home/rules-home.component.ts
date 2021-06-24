import {Component, Input, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, FormControl,FormGroup, Validators,FormArray} from '@angular/forms';
import { DdComponent } from 'src/app/shared/components/dd/dd.component';
import { LabelsComponent } from 'src/app/shared/components/labels/labels.component';

export interface Dd {
  label: string;
  dd: string[];
}

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

  infoSynonym: string = "Lista de sinónimos que permitirá de igual manera identificar el paso correspondiente";
  titleSynonym: string = "Listado de sinónimo";
  placeholderSynonym: string = "Nuevo sinónimo...";
  widthSynonym: number = 100;

  infoKeywords: string = "Hacer click en una etiqueta para desplegar el diccionario de datos"

  textArea:boolean = true;
  name = new FormControl('', [Validators.required]);
  isValid = false;
  dd = [];

  @ViewChild('stepper',{static: false}) stepper : any;
  @ViewChildren(LabelsComponent) listOfLabels : any;
  @ViewChildren('synonym') listOfSynonym : any;
  @ViewChildren('keywords') listOfKeywords : any;
  @ViewChildren(DdComponent) ddComponent : any;
  @Input('display') display: boolean = false
  @Input('Steps') steps = [{ title: null, completed: false, display: false, synonym: [], keywords: [], dd: [] }];
  allCompleted = false;
  lastIndex: number = -1;
  condition = [];
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
    this.steps.push({ title: null, completed: false, display: false, synonym: [], keywords: [], dd:[]});
    this.stepper.selectedIndex = this.steps.length - 1;
    this.allCompleted = false;
  }

  changeStepSelection(event, index) {
    this.isValid = this.name.invalid;
    if(!this.isValid){
      setTimeout(() =>{
        this.stepper.selectedIndex = this.steps.length;
      },0);
      this.saveStep(index)
      this.saveDd(index)
      this.allCompleted = true;
      this.steps[index].completed = true;
    }
  }

  saveStep(index) {
      if(this.listOfSynonym.labels != undefined)
        this.steps[index].synonym  =  this.listOfSynonym._results[0].labels;
      if(this.listOfKeywords.labels != undefined)
        this.steps[index].keywords =  this.listOfKeywords._results[0].labels;
      this.steps[index].title    =  (<HTMLInputElement>document.getElementById("Title")).value;
      this.steps[index].display  =  true

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

  update(index){
    if(this.ddComponent.first != undefined){
      if(this.lastIndex == -1){
        this.lastIndex = index;
      }
      if(this.dd[this.lastIndex] != undefined){
        this.dd[this.lastIndex] = this.ddComponent.first.__proto__.getText();
        this.ddComponent.first.__proto__.setText(this.dd[this.lastIndex]);
      }
      else{
        this.dd.push(this.ddComponent.first.__proto__.getText());
      }
      if(this.dd[index] != undefined){
        this.ddComponent.first.__proto__.setText(this.dd[index]);
      }
      else{
        if(this.ddComponent.first.__proto__)
        this.ddComponent.first.__proto__.setText('')
      }
      this.lastIndex = index;
    }

  }

  remove(index){
    this.update(this.lastIndex)
    if(index == this.lastIndex){

    }
    if(index < this.lastIndex ) this.lastIndex--;

    this.dd.splice(index, 1);
  }

  saveDd(index){
    this.update(this.lastIndex);
    if(this.dd.length != 0){
      let i = 0;
      this.listOfKeywords._results[index].labels.forEach(keyword => {
        this.steps[index].dd.push({label: keyword, dd: this.dd[i].split(",")})
        i++;
      });
    }
  }

  addCondition(){
    this.condition.push('');
  }

}
