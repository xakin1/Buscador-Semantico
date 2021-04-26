import { Component } from '@angular/core';
import { InputsHomeComponent } from '../../configuration-steps-home/inputs-home/inputs-home.component';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent {
  public unique_key: number;
  public parentRef: InputsHomeComponent;
}
