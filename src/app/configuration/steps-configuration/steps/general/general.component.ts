import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { show, showSearchBoxOptions } from 'src/app/app.component';
import { AdvanceOptionsComponentSteps } from './advance-options/advance-options.component';



@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  @Input() step   : any[][]
  @Input() row    : number
  @Input() column : number

  @Output() save = new EventEmitter<any>();
  @Output() show = new EventEmitter<any>();

  constructor(public matDialog: MatDialog) { }

  ngOnInit() {
  }

  saveName() {
    this.save.emit();
  }

  Show(){

    return show
  }

  openAdvanceOptions(){
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "auto";
    dialogConfig.width = "800px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(AdvanceOptionsComponentSteps, dialogConfig);
  }

  showSearchBox(){
    console.log("entro")
    this.show.emit(!this.step[this.column][this.row].searchBox.show)
    this.step[this.column][this.row].searchBox.show = !this.step[this.column][this.row].searchBox.show
    showSearchBoxOptions();
  }



}
