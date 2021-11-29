import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommnandComponent } from './commnand/commnand.component';

const routes: Routes = [
  {
    path: 'comandos', component: CommnandComponent
  },
  {
    path: 'comando', component: CommnandComponent
  },
  {
    path: 'comando/:commandID/step/:stepID', loadChildren: () => import('../configuration-step/configuration-step.module').then(m => m.ConfigurationStepModule)
  },
  {
    path: 'comando/:commandID/sinonimos', loadChildren: () => import('../configuration-synonym/configuration-synonym.module').then(m => m.ConfigurationSynonymModule)
  },
  {
    path: 'comando/:commandID/flujo', loadChildren: () => import('../configuration-work-flow/configuration-work-flow.module').then(m => m.ConfigurationWorkFlowModule)
  },
  {
    path: 'comando/:commandID', component: CommnandComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationCommandRoutingModule { }
