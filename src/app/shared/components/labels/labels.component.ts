import { Component, Input, Output, EventEmitter } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';



export interface Label {
  name: string;
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
  @Input('list') public labels: Label[] = [];
  @Input('editable') editable: boolean = true;
  @Input('removable') removable: boolean = true;
  @Output() update = new EventEmitter<any>();
  @Output() added = new EventEmitter<number>();
  @Output() removed = new EventEmitter<number>();

  public unique_key: number;

  visible = true;
  selectable = true;
  addOnBlur = true;
  display = false;
  currentIndex:number = undefined;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add labelt
    if ((value || '').trim()) {
      this.labels.push({name: value.trim()});
      this.added.emit(this.labels.length-1);
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
    this.removed.emit(index);
  }

  print(index: number){
    this.update.emit({oldIndex: this.currentIndex, newIndex: index});
    this.currentIndex = index;
    this.display = true;
  }



}
