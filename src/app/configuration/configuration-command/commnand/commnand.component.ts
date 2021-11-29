import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare const cargarDatos: any;
declare function cargarComandos(): any;


@Component({
  selector: 'app-commnand',
  templateUrl: './commnand.component.html',
  styleUrls: ['./commnand.component.scss']
})
export class CommnandComponent implements OnInit {

  constructor(private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    cargarComandos()
    let commandId = this.route.snapshot.paramMap.get('commandID');
    cargarDatos(commandId)

  }

  open(url){
    this.router.navigate(["xaquin/"+url])
  }
}
