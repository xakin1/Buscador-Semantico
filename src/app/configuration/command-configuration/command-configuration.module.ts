import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommandConfigurationRoutingModule } from './command-configuration-routing.module';
import { CommandComponent } from './command/command.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdvanceOptionsComponentCommand } from './command/advance-options/advance-options.component';
import { SynonymsComponent } from './command/synonyms/synonyms.component';


@NgModule({
  declarations: [CommandComponent, AdvanceOptionsComponentCommand, SynonymsComponent],
  imports: [
    CommonModule,
    CommandConfigurationRoutingModule,
    SharedModule
  ],
  exports: [CommandComponent],
  entryComponents: [AdvanceOptionsComponentCommand]
})
export class CommandConfigurationModule { }
