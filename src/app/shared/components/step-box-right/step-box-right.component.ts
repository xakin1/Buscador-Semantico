import { Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-step-box-right',
  templateUrl: './step-box-right.component.html',
  styleUrls: ['./step-box-right.component.scss']
})
export class StepBoxRightComponent implements OnInit {


  @Output() edit = new EventEmitter<any>();
  public haveNext = false;
  @Input("titleStep") titleStep = "Title of Step"
  @Input('id') unique_key: number = 0;
  @ViewChild("viewContainer", { read: ViewContainerRef, static : false }) VCR: ViewContainerRef

  constructor(private resolver: ComponentFactoryResolver,public viewContainerRef:ViewContainerRef) { }

  ngOnInit() {
  }

  editStep(){
    this.edit.emit('');
  }

}
