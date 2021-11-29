import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationSynonymModule } from './configuration-synonym.module';
import { SynonymComponent } from './synonym/synonym.component';

const routes: Routes = [
  {
    path: 'comando/:commandID/sinonimos', component: SynonymComponent
  },
  {
    path: 'comando/:commandID/step/:stepID/sinonimos', component: SynonymComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationSynonymRoutingModule { }
