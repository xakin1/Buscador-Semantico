import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkFlowComponent } from './configuration-work-flow/work-flow/work-flow.component';

const routes: Routes = [
  {
    path: 'comando/:commandID/step/:stepID/flujo', component: WorkFlowComponent
  },
  {
    path: 'comando/:commandID/flujo', component: WorkFlowComponent
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
