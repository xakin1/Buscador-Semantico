import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SidebarModule} from 'ng-sidebar'
import {  MatIconModule } from '@angular/material';
import { TrialTreeComponent } from './trial-tree/trial-tree.component';

import { StepPlusComponent } from './trial-tree/step-plus/step-plus.component';
import { StepConditionalComponent } from './trial-tree/step-conditional/step-conditional.component';
import { StepConditionalTrueSelfComponent } from './trial-tree/step-conditional-true-self/step-conditional-true-self.component';
import { StepConditionalFalseSelfComponent } from './trial-tree/step-conditional-false-self/step-conditional-false-self.component';
import { SharedModule } from './shared/shared.module';
import { TreeComponent } from './tree-of-steps/tree/tree.component';

@NgModule({
  declarations: [
    AppComponent,
    TrialTreeComponent,
    StepPlusComponent,
    StepConditionalComponent,
    StepConditionalTrueSelfComponent,
    StepConditionalFalseSelfComponent,
    TreeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SidebarModule,
    SharedModule,
    MatIconModule
  ],
  providers: [],
  entryComponents: [StepPlusComponent,StepConditionalComponent,StepConditionalFalseSelfComponent,StepConditionalTrueSelfComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
