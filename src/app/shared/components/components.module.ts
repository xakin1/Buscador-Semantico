import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { SliderComponent } from './slider/slider.component';
import { SharedModule } from '../shared.module';


@NgModule({
  declarations: [SliderComponent],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    SharedModule
  ],
  exports: [SharedModule,SliderComponent]
})
export class ComponentsModule { }
