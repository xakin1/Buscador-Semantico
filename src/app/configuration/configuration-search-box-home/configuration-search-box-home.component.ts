import {map, startWith} from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SliderComponent } from 'src/app/shared/components/slider/slider.component';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Identifiers } from '@angular/compiler';

export interface ResponseHttp {
  dataList: DataList;
  searchValue: number;
}

export interface DataList {
  name: string;
  link: string;
  imgUrl: string;
  description: any;
  pos: number;
}


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

  @ViewChild("nivelSemantico",{static: false}) semantico;

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  response: ResponseHttp[] = [];
  search = false;
  url = 'https://api.s-recsolutions.com/v1/search';

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

  print(){
    console.log("index")
  }

  doSearch(){
    // hacemos la busqueda y procesamos los datos...
    // let datalist: DataList[] = [];
    // let result = [["name::fisioterapia ATM","url::fisioterapia-atm.html","imgUrl::images/shutterstock_545702272.jpg","description::La fisioterapia en la ATM puede ayudarte si tienes alguno de estos síntomas: ¿Tienes dificultades para abrir la boca? ¿Tienes dolor en las articulaciones de la mandíbula? ¿Te duele la cabeza o el cuello con frecuencia? ¿Aprietas o rechina los dientes? ¿Sientes que se te desencaja la mandíbula? ¿Escuchas ruidos articulares? ¿Te duele la musculatura de la cara o de la boca? ¿Te despiertas con mucha tensión o sensación de bloqueo? ¿Notas limitación al abrir la boca?"]]
    this.send_Buscar();
    this.search=true;

  }



  abir_enlace(link){
    window.open(link);
 }

  copia_portapapeles(link){
    let selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = link;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
 }

  send_Buscar() {
    var kweight = this.semantico.value
    var Lweight = 100 - kweight;
    var type = '';
    var data = {
      'apiKey': '02d5214506fa468484e962868800395f',
      'userPwd': '69637182',
      'profileID': '1268900770',
      'filter': {"search":(<HTMLInputElement>document.getElementById("search")).value.toString()},
      'Kweigth': ''+kweight,
      'Lweigth': ''+Lweight,
    };
    var pathName = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1,window.location.pathname.length);
    if(pathName=="search-result.html")
    {
      if(data.filter.search==="Dime qué te ocurre para que pueda ver qué servicio se ajusta mejor a ti")
        data.filter.search=localStorage.getItem("SearchKey");
    }

    localStorage.setItem("SearchKey", data.filter.search);

    var url = 'https://api.s-recsolutions.com/v1/search';

    this.send_post(data, url, type).then((j) => {
      console.log('Response:', j);

      if(pathName=="searchBox")
      {
        var result = JSON.parse(j);
        var resultado= document.querySelector('#resultado1');
        resultado.innerHTML=' ';
        if (Math.min(result.length,4)==0)
        {
          resultado.innerHTML +=`
          <li>No hay ningún resultado que coincida con la búsqueda ...</li>
          `

        }
        else
        {
          this.response = [];
          for (var index=0; index< Math.min(result.length,5); index++)
          {
            var nombre =result[index].dataList[0];
            nombre =nombre.substring(nombre.lastIndexOf(':')+1, nombre.length);
            var link =result[index].dataList[1];
            link =link.substring(link.lastIndexOf(':')+1, link.length);
            var img_url =result[index].dataList[2];
            img_url =img_url.substring(img_url.lastIndexOf(':')+1, img_url.length);
            var description=result[index].dataList[3];
            var pos=description.lastIndexOf('::')+2;
            description =description.substring(pos, Math.min(description.length,pos+60));

            var datalist = {name: nombre, link: link, imgUrl : img_url, description: description, pos: pos};
            this.response.push({dataList: datalist, searchValue : result[index].searchValue});

          }
      }
      }


    });
  }



 send_post(data, url, type) {
    var valor, index;
    return fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'text/plain',
        'Content-Type': 'text/plain'
      },
      body: JSON.stringify(data)
    }).then(function(response) {
      return response.text();
    }).then(function(text) {
      if (!localStorage.getItem('userPwd') && !localStorage.getItem('profileID')) {
        index = text.indexOf('\n');
        valor = text.substring(0, index);
        localStorage.setItem('userPwd', valor);
        valor = text.substring(index + 1);
        localStorage.setItem('profileID', valor);
      }
      if(type == 'event') {
        text = valor;
        index = text.indexOf('\n');
        valor = text.substring(0, index);
        valor = text.substring(index + 1);
        localStorage.setItem('idEvent', valor);
      }
      return text;
    });
  }

  send_get(params, url) {
    var queryString = Object.keys(params).map(function(key) {
      return key + '=' + params[key]
    }).join('&');

    var completeUrl = url +"?"+ queryString;
    return fetch(completeUrl, {
      method: 'GET',
      mode: 'cors',
      headers: {
        // 'Accept': 'text/plain',
        'Content-Type': 'application/json'
      },
    }).then(function(response) {
      return response.text();
    }).then(function(text) {
      return text;
    });
  }

}




