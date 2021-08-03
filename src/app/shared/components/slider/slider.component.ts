import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent{
  autoTicks = false;
  disabled = false;
  invert = false;
  @Input('max') max:number = 100;
  @Input('min') min:number = 0;
  @Output() change = new EventEmitter<number>();

  showTicks = false;
  step = 1;
  thumbLabel = false;
  @Input('value') value:number = 50;
  vertical = false;
  tickInterval = 1;

  sliderOnChange(value: number) {
    this.change.emit(value)
  }

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }

}
