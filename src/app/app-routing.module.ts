import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationSearchBoxHomeComponent } from './configuration/configuration-search-box-home/configuration-search-box-home.component';
import { TreeComponent } from './configuration/tree/tree.component';




const routes: Routes = [
  {
    path: '',
    component: TreeComponent
  },
  {
    path: 'configuration/steps',
    component: TreeComponent
  },
  {
    path: 'configuration/searchBox', component: ConfigurationSearchBoxHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
