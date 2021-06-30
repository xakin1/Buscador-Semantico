import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-true',
  templateUrl: './true.component.html',
  styleUrls: ['./true.component.scss']
})
export class TrueComponent implements OnInit {

  @Output() open = new EventEmitter<any>();

  openSideBar(){
    this.open.emit('');
  }

  constructor() { }

  ngOnInit() {
  }

}
