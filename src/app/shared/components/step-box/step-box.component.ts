import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-step-box',
  templateUrl: './step-box.component.html',
  styleUrls: ['./step-box.component.scss']
})
export class StepBoxComponent implements OnInit {


  @Output() edit = new EventEmitter<any>();
  @Input("titleStep") titleStep = "Title of Step"
  constructor() { }

  ngOnInit() {
  }

  editStep(){
    this.edit.emit('');
  }


}
