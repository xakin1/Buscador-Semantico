import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.scss']
})
export class ComboBoxComponent implements OnInit {

  @Input('id') id: string = '';
  item : string = '';
  @Output() changed = new EventEmitter<any>();
  @Input('data') data: any[] = [];
  @Input('blankSpace') bs: boolean = true;
  @Input('blankSpaceData') bsd: string = '';


  constructor() { }

  ngOnInit(): void {
  }

  onChange(item : any){
    this.changed.emit(item)
  }
}
