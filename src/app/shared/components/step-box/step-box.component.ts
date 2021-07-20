import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import 'leader-line';
import { Step } from '../components.module';
declare let LeaderLine: any;


@Component({
  selector: 'app-step-box',
  templateUrl: './step-box.component.html',
  styleUrls: ['./step-box.component.scss']
})
export class StepBoxComponent implements OnInit {


  @Output() edit = new EventEmitter<any>();
  @Input("titleStep") titleStep = "Title of Step"
  open: boolean = false;
  columns: Step[][] = []
  constructor() { }
  selectedItem ;

  ngOnInit() {
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
