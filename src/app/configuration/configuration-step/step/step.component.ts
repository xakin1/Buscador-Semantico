import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare const cargarDatos: any;
declare const cargarComandos: any;

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

  commandId : string;
  similarName_checkbox: boolean = false

  constructor(private router:Router,private route: ActivatedRoute) {
    this.commandId = this.route.snapshot.paramMap.get('commandID');
  }

  ngOnInit(): void {
    cargarComandos();

    if(this.commandId != undefined){
      cargarDatos(this.commandId)
    }
  }

  open(url){
    this.router.navigate(["xaquin/"+url])
  }
}

