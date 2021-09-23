import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommandComponent } from './command-configuration/command/command.component';
import { StepsConfigurationComponent } from './steps-configuration/steps-configuration.component';



const routes: Routes = [
  {
    path: 'steps/:id',
    component: StepsConfigurationComponent
  },
  {
    path: 'command',
    component: CommandComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
