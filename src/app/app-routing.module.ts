import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StepsComponent } from './tree-of-steps/steps/steps.component';
import { TreeComponent } from './tree-of-steps/tree/tree.component';
import { StepPlusComponent } from './trial-tree/step-plus/step-plus.component';
import { TrialTreeComponent } from './trial-tree/trial-tree.component';



const routes: Routes = [
  {
    path: '',
    component: TreeComponent
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
