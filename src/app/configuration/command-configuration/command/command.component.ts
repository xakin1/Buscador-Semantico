import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material';
import { Router } from '@angular/router';
import { send_edit_command, send_get_command } from 'src/app/ApiCalls/llamadas-api/llamadas-api.component';
import { AdvanceOptionsComponentCommand } from './advance-options/advance-options.component';

export interface Command{
  commandDescription : string,
  commandName        : string,
  type               : string,
  commandID          : any,
  steps              : any;
}

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})

export class CommandComponent implements OnInit {

  show                = false;
  configCommand       = true;
  configSinonimos     = false;
  position            = undefined
  treeData = [
    {
      name: 'Configuración de Comandos',
      children: [ { name: 'General'}, { name: 'Sinónimos'}, { name: 'Steps'}]
    }
  ]

  edit   : boolean = false;
  vacio  : boolean = false;

  listOfCommands : Command[] = []

  constructor(private route:Router,public matDialog: MatDialog) {
  }


  async ngOnInit() {
    this.listOfCommands = await send_get_command('')
  }

  title = 'Buscador-semantico';
  opened: boolean = false;
  baseUrl = window.location.origin+"/xaquin/"

  toggleSidebar() {
    this.opened = !this.opened;
  }

  Show(){
    return this.show
  }

  ShowSearchBox(name){
    switch(name) {
      case "Configurar Buscador semántico":
        return false || this.show;
      case "Configurar Barra de búsqueda":
        return false || this.show;
      default: true;

      return true;
    }
  }

  goTo(url){
    this.route.navigate([url]);
    this.toggleSidebar();
  }

    /* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
    openNav(i) {
      this.loadCommand();
      this.position = i;
      document.getElementById("mySidebar").style.width = "350px";
    }

    /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
    closeNav() {
      document.getElementById("mySidebar").style.width = "0";
    }

    saveNameCommand() {
      if((<HTMLInputElement>document.getElementById("Title")) != undefined){
          let name = (<HTMLInputElement>document.getElementById("Title")).value;

          name = name == undefined ? '' : name
          this.listOfCommands[this.position].commandName = name;
      }

      if((<HTMLInputElement>document.getElementById("descripcion")) != undefined){
        let descripcion = (<HTMLInputElement>document.getElementById("descripcion")).value;

        descripcion = descripcion == undefined ? '' : descripcion
        this.listOfCommands[this.position].commandDescription = descripcion;
      }

      send_edit_command(this.listOfCommands[this.position].commandName,this.listOfCommands[this.position].commandID,this.listOfCommands[this.position].commandDescription);
    }

    openAdvanceOptions(){
      const dialogConfig = new MatDialogConfig();
      // The user can't close the dialog by clicking outside its body
      dialogConfig.disableClose = true;
      dialogConfig.id = "modal-component";
      dialogConfig.height = "auto";
      dialogConfig.width = "800px";
      // https://material.angular.io/components/dialog/overview
      const modalDialog = this.matDialog.open(AdvanceOptionsComponentCommand, dialogConfig);
    }

    loadCommand(){
      setTimeout(()=>{
        if(<HTMLInputElement>document.getElementById("Title") != undefined)
          (<HTMLInputElement>document.getElementById("Title")).value = this.listOfCommands[this.position].commandName

        if((<HTMLInputElement>document.getElementById("descripcion")) != undefined)
          (<HTMLInputElement>document.getElementById("descripcion")).value = this.listOfCommands[this.position].commandDescription != undefined ? this.listOfCommands[this.position].commandDescription : "";
      })
    }

    openStepsCommand(){
      let commandId = this.listOfCommands[this.position].commandID
      this.route.navigate(['steps/'+commandId])
    }

    createCommand(){
      send_edit_command('new command',undefined,undefined)
    }


}
