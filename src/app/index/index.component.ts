import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare const cargarComandos: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    cargarComandos()
  }
  open(url){

    console.log("a")
    this.router.navigate(["xaquin/"+url])
  }
}
