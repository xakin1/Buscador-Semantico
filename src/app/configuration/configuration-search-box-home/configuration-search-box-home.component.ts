import {map, startWith} from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SliderComponent } from 'src/app/shared/components/slider/slider.component';

@Component({
  selector: 'app-configuration-search-box-home',
  templateUrl: './configuration-search-box-home.component.html',
  styleUrls: ['./configuration-search-box-home.component.scss']
})
export class ConfigurationSearchBoxHomeComponent implements OnInit {

  width: number
  heigth: number
  placeholder: string = (<HTMLInputElement>document.getElementById("placeholder")) ?(<HTMLInputElement>document.getElementById("placeholder")).value : "search";

  maxResultados:number = 500;
  minResultados:number = 0

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  constructor() { }

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
}
