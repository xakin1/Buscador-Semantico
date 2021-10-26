import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { MatSliderModule,MatButtonModule,MatTreeModule,MatIconModule, MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material';
import {FlatTreeControl} from '@angular/cdk/tree';

export var show                = false;
export var configSteps         = true;
export var configSearchBox     = false;
export var configSemantic      = false;
export var configSinonimos     = false;
export var configKeywords      = false;
export var configFlujoDeDatos  = false;



export function showSearchBoxOptions(){
  show = !show;
}

export function getConfigFlujoDeDatos(){
  return configFlujoDeDatos;
}

interface FoodNode {
  name: string;
  children?: FoodNode[];
 }
 const TREE_DATA: FoodNode[] = [
  {
    name: 'Configuración de pasos',
    children: [ { name: 'General'}, { name: 'Sinónimos'}, {name: 'Palabras clave'}, {name: 'Flujo de datos'}]
  },
  {
    name: 'Buscador Semántico',
    children: [ {name: 'Configurar Barra de búsqueda'}, {name: 'Configurar Buscador semántico'}]
  }
];
 /** Flat node with expandable and level information */
 interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
 }


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable

  constructor(private route:Router) {
    this.dataSource.data = TREE_DATA;
  }


  title = 'Buscador-semantico';
  opened: boolean = false;
  baseUrl =window.location.origin+"/xaquin/"


  toggleSidebar() {
    this.opened = !this.opened;
  }

  goTo(url){
    this.route.navigate([url]);
    this.toggleSidebar();
  }
}
