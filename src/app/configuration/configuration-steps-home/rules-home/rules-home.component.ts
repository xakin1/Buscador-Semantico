import {Component, Input, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, FormControl,FormGroup, Validators,FormArray} from '@angular/forms';
import { LabelsComponent } from 'src/app/shared/labels/labels.component';


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


  @ViewChild('stepper',{static: false}) stepper : any;
  @ViewChildren(LabelsComponent) listOfLabels : any;
  @ViewChildren('synonym') listOfSynonym : any;
  @ViewChildren('keywords') keywords : any;

  @Input('Steps') steps = [{ title: null, completed: false, display: false, synonym: [], keywords: [] }];
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
    this.steps.push({ title: null, completed: false, display: false, synonym: [], keywords: []});
    this.stepper.selectedIndex = this.steps.length - 1;
    this.allCompleted = false;
  }

  changeStepSelection(event, index) {
    setTimeout(() =>{
      this.stepper.selectedIndex = this.steps.length;
    },0);
    this.saveStep(index)
    this.allCompleted = true;
    this.steps[index].completed = true;
  }

  saveStep(index) {
      this.steps[index].synonym  =  this.listOfSynonym._results[0].labels
      this.steps[index].keywords =  this.keywords._results[0].labels
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

  }
