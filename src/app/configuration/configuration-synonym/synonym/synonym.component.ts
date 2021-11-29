import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare const cargarComandos: any;
declare const send_get_command: any;

@Component({
  selector: 'app-synonym',
  templateUrl: './synonym.component.html',
  styleUrls: ['./synonym.component.scss']
})
export class SynonymComponent implements OnInit {
  infoSynonym : string  = "Lista de sinónimos que permitirá de igual manera identificar el paso correspondiente";
  titleSynonym: string  = "Listado de sinónimo";
  widthSynonym: number  = 200;
  placeholderSynonym : string  = "Nuevo sinónimo...";
  //command : Command[] = []
  synonyms: Array<string> = []
  commandId : string;

  idiomas = ["es – Español","en – Inglés","pt – Portugués","gl – Galego","fr – Francés","it - Italiano"];

  constructor(private router:Router,private route: ActivatedRoute) {
    this.commandId = this.route.snapshot.paramMap.get('commandID');
   }

  ngOnInit(): void {
    cargarComandos();
    var path = window.location.href.split("/");
    if(path.length > 4){
      let commandId = path[4]
      // this.command = await send_get_command(commandId)
      // this.synonyms =  this.command[0].synonyms.split(',')
    }
  }

  chargeSynonym(item: any){
    console.log(item)
  }


  open(url){

    this.router.navigate(["xaquin/"+url])
  }

}
