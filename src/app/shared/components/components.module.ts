import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { ComboBoxComponent } from './combo-box/combo-box.component';
import { FormsModule } from '@angular/forms';
import { InfoComponent } from './info/info.component';
import { MaterialModule } from './material/material.module';
import { LabelsComponent } from './labels/labels.component';
import { TrueComponent } from './true/true.component';
import { DefaultComponent } from './default/default.component';
import { StepBoxComponent } from './step-box/step-box.component';
import { EndComponent } from './end/end.component';

@NgModule({
  declarations: [
    ComboBoxComponent,
    InfoComponent,
    LabelsComponent,
    TrueComponent,
    DefaultComponent,
    StepBoxComponent,
    EndComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    MaterialModule,
    FormsModule
  ],
  exports:[ComboBoxComponent,InfoComponent,
    LabelsComponent,TrueComponent,DefaultComponent,StepBoxComponent]
})
export class ComponentsModule { }
