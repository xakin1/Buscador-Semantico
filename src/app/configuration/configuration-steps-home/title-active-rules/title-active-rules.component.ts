import { Component } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';


export interface Label {
  name: string;
}
@Component({
  selector: 'app-title-active-rules',
  templateUrl: './title-active-rules.component.html',
  styleUrls: ['./title-active-rules.component.scss']
})
export class TitleActiveRulesComponent {
  path: any;

  constructor(private router: Router) {
    this.path = this.router.url;
  }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  labels: Label[] = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add label
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

  print(label: Label): void{
    console.log(label)
  }
}
