import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TreeComponent } from './configuration/tree/tree.component';




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
