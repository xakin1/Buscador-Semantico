import { Component, ComponentFactoryResolver, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { EndComponent } from '../end/end.component';

@Component({
  selector: 'app-plus',
  templateUrl: './plus.component.html',
  styleUrls: ['./plus.component.scss']
})
export class PlusComponent implements OnInit {

  @ViewChild (EndComponent, {static: false}) public dinamycHost: EndComponent;

  @Output() open = new EventEmitter<any>();

  openSideBar(){
    this.open.emit('');
  }

  constructor(private componentFactoryResolver:ComponentFactoryResolver,public viewContainerRef:ViewContainerRef) {

  }

  ngOnInit() {

  }


}
