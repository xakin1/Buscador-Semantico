import {Component} from '@angular/core';

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

  handleDone(){
    this.procedureFinished = true;
  }

  handleReset(){
    this.procedureFinished = false;
  }

}
