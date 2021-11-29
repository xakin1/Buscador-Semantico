import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {


  @Input('title') title: string = "Labels";
  @Input('placeholder') placeholder: string = "New label...";
  @Input('width') width: number= 50;
  @Input('textArea') textArea: boolean = false;
  @Input('list') public labels: String[] = [];
  @Input('editable') editable: boolean = true;
  @Input('removable') removable: boolean = true;
  @Output() update = new EventEmitter<any>();
  @Output() added = new EventEmitter<number>();
  @Output() removed = new EventEmitter<number>();

  public unique_key: number = -1;

  visible = true;
  selectable = true;
  addOnBlur = true;
  display = false;
  currentIndex : number = -1;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(){}

  ngOnInit(){}

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add labelt
    if ((value || '').trim()) {
      this.labels.push(value.trim());
      this.added.emit(this.labels.length-1);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

  }

  remove(label: String): void {
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
