import { Component, Input, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';



export interface Label {
  name: string;
  dd: string[];
}

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent{

  @Input('title') title: string = "Labels";
  @Input('placeholder') placeholder: string = "New label...";
  @Input('width') width: number= 50;
  @Input('textArea') textArea: boolean = false;
  @Input('list') labels: Label[] = [];
  @Input('editable') editable: boolean = true;

  @ViewChild('dd',{static: false}) dd : any;
  public unique_key: number;

  visible = true;
  selectable = true;
  addOnBlur = true;
  display = false;
  currentIndex:number = null;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add labelt
    if ((value || '').trim()) {
      this.labels.push({name: value.trim(), dd: []});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(label: Label): void {
    const index = this.labels.indexOf(label);

    if (index >= 0) {
      this.labels.splice(index, 1);
    }
  }

  print(index: number){
    this.currentIndex = index;
    this.display = true;
  }

  saveDd(){
    let dd =  (<HTMLInputElement>document.getElementById("dd")).value.trim();
    this.labels[this.currentIndex].dd =  dd.split(",");
    this.display = false;
  }

}
