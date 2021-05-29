import { A } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { SliderComponent } from 'src/app/shared/components/slider/slider.component';

@Component({
  selector: 'app-configuration-search-box-home',
  templateUrl: './configuration-search-box-home.component.html',
  styleUrls: ['./configuration-search-box-home.component.scss']
})
export class ConfigurationSearchBoxHomeComponent implements OnInit {

  @ViewChild('alto',{static: false}) alto: SliderComponent;
  @ViewChild('alto',{static: false}) ancho: Observable<SliderComponent>;

  width: number
  heigth: number
  placeholder: string = (<HTMLInputElement>document.getElementById("placeholder")) ?(<HTMLInputElement>document.getElementById("placeholder")).value : "search";

  constructor() { }

  ngOnInit() {
    this.placeholder = (<HTMLInputElement>document.getElementById("placeholder")) ?(<HTMLInputElement>document.getElementById("placeholder")).value : "search";
  }

}
