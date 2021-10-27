import { DOCUMENT } from '@angular/common';
import { Component, ComponentFactoryResolver, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-synonyms-configuration',
  templateUrl: './synonyms-configuration.component.html',
  styleUrls: ['./synonyms-configuration.component.scss']
})
export class SynonymsConfigurationComponent implements OnInit {

  constructor(private route: ActivatedRoute,private resolver: ComponentFactoryResolver,private _formBuilder: FormBuilder,
    private renderer2: Renderer2, @Inject(DOCUMENT) private _document) {
}


    infoSynonym : string  = "Lista de sinónimos que permitirá de igual manera identificar el paso correspondiente";
    titleSynonym: string  = "Listado de sinónimo";
    widthSynonym: number  = 400;
    placeholderSynonym : string  = "Nuevo sinónimo...";



async ngOnInit() {

  const s = this.renderer2.createElement('script');
  s.type = 'text/javascript';
  s.src = '../../../assets/js/steps.js';
  s.text = ``;
  this.renderer2.appendChild(this._document.body, s);

}
}

