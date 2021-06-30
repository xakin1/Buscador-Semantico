import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationSearchBoxHomeComponent } from './configuration-search-box-home/configuration-search-box-home.component';
import { TreeComponent } from './tree/tree.component';


const routes: Routes = [
  {
    path: 'steps',
    component: TreeComponent
  },
  {
    path: 'searchBox',
    component: ConfigurationSearchBoxHomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
