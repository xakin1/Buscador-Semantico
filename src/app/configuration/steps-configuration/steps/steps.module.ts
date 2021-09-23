import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepsRoutingModule } from './steps-routing.module';
import { GeneralComponent } from './general/general.component';

import { SynonymsComponent } from './synonyms/synonyms.component';
import { WorkFlowComponent } from './work-flow/work-flow.component';
import { DiccionarioDeDatosComponent } from './diccionario-de-datos/diccionario-de-datos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdvanceOptionsComponentSteps } from './general/advance-options/advance-options.component';


@NgModule({
  declarations: [GeneralComponent,AdvanceOptionsComponentSteps,SynonymsComponent,WorkFlowComponent,DiccionarioDeDatosComponent],
  imports: [
    CommonModule,
    StepsRoutingModule,
    SharedModule
  ],
  exports: [GeneralComponent,AdvanceOptionsComponentSteps,SynonymsComponent,WorkFlowComponent,DiccionarioDeDatosComponent, SharedModule],
  entryComponents: [AdvanceOptionsComponentSteps]
})
export class StepsModule { }
