import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { ComponentsModule } from './components/components.module';


@NgModule({
  declarations: [],
  imports: [
    SharedRoutingModule,
    ComponentsModule
  ],
  exports: [
    ComponentsModule
  ]
})
export class SharedModule { }
