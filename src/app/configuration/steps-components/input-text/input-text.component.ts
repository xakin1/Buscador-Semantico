import { Component, OnInit } from '@angular/core';
import { ConfigurationStepsHomeComponent } from '../../configuration-steps-home/configuration-steps-home.component';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent {
  public unique_key: number;
  public parentRef: ConfigurationStepsHomeComponent;
}
