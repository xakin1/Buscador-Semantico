import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SynonymComponent } from './synonym/synonym.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfigurationSynonymRoutingModule } from './configuration-synonym-routing.module';


@NgModule({
  declarations: [
    SynonymComponent
  ],
  imports: [
    CommonModule,
    ConfigurationSynonymRoutingModule,
    SharedModule,
  ],
  exports: [SharedModule]
})
export class ConfigurationSynonymModule { }
