import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import 'leader-line';
declare let LeaderLine: any;

export interface LineConditions{
  true: any,
  false: any,
  indexFalse: number,
  indexTrue: number;
}

export interface Step{
  id: string
  name: string,
  haveNext: boolean,
  synonym: any[],
  keywords: any[],
  dd: any[],
  conditions: any[],
  lineConditions: LineConditions[],
  lineNextStep: any,
  unique_key : number;
  end: boolean;
}

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
      console.log("end "+ this.columns[column][row].id)
      let line = drawLine(startElement,endElement);
      this.columns[column][row].lineNextStep = line;
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
