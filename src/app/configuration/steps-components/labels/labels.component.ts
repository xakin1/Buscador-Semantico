import { Component } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import { ConfigurationStepsHomeComponent } from '../../configuration-steps-home/configuration-steps-home.component';



export interface Label {
  name: string;
}

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent{
  public unique_key: number;
  public parentRef: ConfigurationStepsHomeComponent;



visible = true;
selectable = true;
removable = true;
addOnBlur = true;
readonly separatorKeysCodes: number[] = [ENTER, COMMA];
labels: Label[] = [];

add(event: MatChipInputEvent): void {
  const input = event.input;
  const value = event.value;

  // Add labelt
  if ((value || '').trim()) {
    this.labels.push({name: value.trim()});
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
}
