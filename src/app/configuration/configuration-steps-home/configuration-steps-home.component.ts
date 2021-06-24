import {Component, ViewChild} from '@angular/core';
import { RulesHomeComponent } from './rules-home/rules-home.component';
import { TitleActiveRulesComponent } from './title-active-rules/title-active-rules.component';

/**
 * @title Stepper overview
 */
 @Component({
  selector: 'app-configuration-steps-home',
  templateUrl: './configuration-steps-home.component.html',
  styleUrls: ['./configuration-steps-home.component.scss']
})
export class ConfigurationStepsHomeComponent{
  procedureFinished:boolean = false
  display: boolean;

  @ViewChild(TitleActiveRulesComponent,{static: false}) titles: any;
  @ViewChild(RulesHomeComponent,{static: false}) steps;

  handleDone(){
    let obj = {};
    let i = 0;
    // this.steps.steps.forEach(item =>{
    //   obj[i]['title'] = item.title
    //   obj[i]['synonym'] = item.synonym
    //   obj[i]['keywords'] = item.keywords
    //   i++;
    // });
    let json = JSON.stringify(this.steps.steps);

    this.procedureFinished = true;
  }

  handleReset(){
    this.procedureFinished = false;
  }

  print(){
    this.display= true;
  }

}
