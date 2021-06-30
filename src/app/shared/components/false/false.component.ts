import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-false',
  templateUrl: './false.component.html',
  styleUrls: ['./false.component.scss']
})
export class FalseComponent implements OnInit {

  @Output() open = new EventEmitter<any>();

  openSideBar(){
    this.open.emit('');
  }

  constructor() { }

  ngOnInit() {
  }

}
