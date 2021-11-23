import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommandComponent } from './command-configuration/command/command.component';
import { StepsConfigurationComponent } from './steps-configuration/steps-configuration.component';
import { SynonymsConfigurationComponent } from './synonyms-configuration/synonyms-configuration.component';



const routes: Routes = [
  {
    path: '', component : StepsConfigurationComponent
  },
  {
    path: ':id/sinonimos', component : SynonymsConfigurationComponent
  },
  {
    path: ':id/step/:id',
    component: StepsConfigurationComponent
  },
  {
    path: ':id', component : StepsConfigurationComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
