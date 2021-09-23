import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommandComponent } from './configuration/command-configuration/command/command.component';
import { StepsConfigurationComponent } from './configuration/steps-configuration/steps-configuration.component';






const routes: Routes = [
  {
    path: '',
    component: CommandComponent
  },
  {
    path: 'configuration/steps',
    component: StepsConfigurationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
