import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StepPlusComponent } from './trial-tree/step-plus/step-plus.component';
import { TrialTreeComponent } from './trial-tree/trial-tree.component';



const routes: Routes = [
  {
    path: '',
    component: TrialTreeComponent
  },
  {
    path: 'configuration', loadChildren: () => import('./configuration/configuration.module').then(m => m.ConfigurationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
