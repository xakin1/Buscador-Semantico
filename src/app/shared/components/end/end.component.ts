import { Component, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent implements OnInit {

  constructor(public viewContainerRef:ViewContainerRef) { }

  ngOnInit() {
  }

}
