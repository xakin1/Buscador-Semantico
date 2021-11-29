import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigurationCommandRoutingModule } from './configuration/configuration-command/configuration-command-routing.module';
import { ConfigurationCommandModule } from './configuration/configuration-command/configuration-command.module';
import { ConfigurationSynonymModule } from './configuration/configuration-synonym/configuration-synonym.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    ConfigurationCommandModule,
    ConfigurationCommandModule,
    ConfigurationSynonymModule,
    AppRoutingModule,
  ],
  exports:[AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
