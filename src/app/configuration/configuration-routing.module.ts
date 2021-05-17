import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationStepsHomeComponent } from './configuration-steps-home/configuration-steps-home.component';


const routes: Routes = [
  {
    path: '',
    component: ConfigurationStepsHomeComponent
  },
  {
    path: ':nombre',
    component: ConfigurationStepsHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
