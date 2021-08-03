import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormControl } from '@angular/forms';
import 'leader-line';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Step } from '../components.module';
declare let LeaderLine: any;


@Component({
  selector: 'app-step-box',
  templateUrl: './step-box.component.html',
  styleUrls: ['./step-box.component.scss']
})
export class StepBoxComponent implements OnInit {

  myControl = new FormControl();

  @Output() edit = new EventEmitter<any>();
  @Input("titleStep") titleStep = "Title of Step"
  open: boolean = false;
  options: string[] = ['One', 'Two', 'Three'];
  columns: Step[][] = []
  constructor() { }
  selectedItem ;
  filteredOptions: Observable<string[]>;


  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  editStep(row, column,id){
    this.open = true;
    this.selectedItem = id
    this.edit.emit({row: row, column: column});
  }

  public close(){
    this.open = false;
  }
  public end(column,row,startElement){
    this.columns[column][row].end = true;

    setTimeout(()=>{
      let endElement = (<HTMLInputElement>document.getElementById("end "+ this.columns[column][row].id))
      let line = drawLine(startElement,endElement);
      this.columns[column][row].nextStep.push({column: undefined, row: undefined,  line: line});
    })
  }
}

function drawLine(startElement, endElement){
  let line = new LeaderLine({
      start: startElement,
      end: endElement
      });

  return line
}


