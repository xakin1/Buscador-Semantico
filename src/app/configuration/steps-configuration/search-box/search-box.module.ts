import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchBoxRoutingModule } from './search-box-routing.module';
import { BarConfigComponent } from './bar-config/bar-config.component';
import { SearchBoxConfigComponent } from './search-box-config/search-box-config.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [BarConfigComponent, SearchBoxConfigComponent],
  imports: [
    CommonModule,
    SearchBoxRoutingModule,
    SharedModule
  ],
  exports: [
    BarConfigComponent, SearchBoxConfigComponent
  ]
})
export class SearchBoxModule { }
