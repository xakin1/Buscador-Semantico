import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationStepModule } from '../configuration-step/configuration-step.module';
import { StepComponent } from './step/step.component';

const routes: Routes = [
  {
    path: 'comando/:commandID/step/:stepID', component: StepComponent
  },
  {
    path: 'comando/:commandID/step/:stepID/sinonimos', loadChildren: () => import('../configuration-synonym/configuration-synonym.module').then(m => m.ConfigurationSynonymModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationStepRoutingModule { }
