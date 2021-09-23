import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-advance-options',
  templateUrl: './advance-options.component.html',
  styleUrls: ['./advance-options.component.scss']
})
export class AdvanceOptionsComponentCommand implements OnInit {
  @Input() similarName   : boolean = false;
  @Input() question      : boolean = false;
  @Input() stopWord      : boolean = false;
  @Input() iterationSave : boolean = false;

  constructor(public dialogRef: MatDialogRef<AdvanceOptionsComponentCommand>) { }

  ngOnInit() {
  }

    // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal() {
    this.dialogRef.close();
  }

}
