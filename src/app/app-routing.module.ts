import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComandosComponent } from './comandos/comandos.component';
import { StepsConfigurationComponent } from './configuration/steps-configuration/steps-configuration.component';
import { SynonymsConfigurationComponent } from './configuration/synonyms-configuration/synonyms-configuration.component';
import { IndexComponent } from './index/index.component';


const routes: Routes = [
  {
    path: 'index', component : IndexComponent
  },
  {
    path: 'comandos', loadChildren: () => import('./configuration/configuration.module').then(m => m.ConfigurationModule)
  },
  {
    path: 'comando', loadChildren: () => import('./configuration/configuration.module').then(m => m.ConfigurationModule)
  },
  {
    path: '', component : IndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
