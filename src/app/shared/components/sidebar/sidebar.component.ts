import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material';

export interface Command{
  commandDescription : string,
  commandName        : string,
  type               : string,
  commandID          : any,
  steps              : any;
}

interface Node {
  name: string;
  children?: Node[];
 }

 /** Flat node with expandable and level information */
 interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
 }

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() show                 = false;
  @Output() open                = new EventEmitter<any>();
  @Output() isShowChange        = new EventEmitter<boolean>();
  @Output() configCommand       = new EventEmitter<boolean>();
  @Output() configSinonimos     = new EventEmitter<boolean>();
  @Output() configSteps         = new EventEmitter<boolean>();
  @Output() configSearchBox     = new EventEmitter<boolean>();
  @Output() configSemantic      = new EventEmitter<boolean>();
  @Output() configKeywords      = new EventEmitter<boolean>();
  @Output() configFlujoDeDatos  = new EventEmitter<boolean>();
  @Input() position            = undefined
  @Input() command: boolean;
  @Input('treeData') TREE_DATA: any;
  @Input('readNode') readNode;

  constructor() {}

  ngAfterViewInit(){
    console.log(this.readNode)
    this.dataSource.data = this.TREE_DATA
  }
  setShow(val :boolean){
    this.show = val
  }

  ngOnInit() {
  }

  private _transformer = (node: Node, level: number) => {
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

  ReadNode(name){
    this.open.emit();
    if(this.command){

      this.configSinonimos.emit(false);
      this.configSinonimos.emit(false);
      switch(name) {
        case "General":
          console.log(1)
          this.configCommand.emit(true);
          break;

        case "Sinónimos":
          console.log(0)
          this.configSinonimos.emit(true);
          break;

        case "Steps":
          console.log(2)
          this.configSinonimos.emit(true);
          break;

        default:
          this.configCommand.emit(true);

      }
    }
    else{
      this.configSteps.emit(false);
      this.configSearchBox.emit(false);
      this.configSemantic.emit(false);
      this.configSinonimos.emit(false);
      this.configKeywords.emit(false);
      this.configFlujoDeDatos.emit(false);

      switch(name) {
        case "General":
          this.configSteps.emit(true);
          break;
        case "Sinónimos":
          this.configSinonimos.emit(true);;
          break;

        case "Palabras clave":
          this.configKeywords.emit(true);
          break;
        case "Configurar Barra de búsqueda":
          this.configSearchBox.emit(true);
          break;

        case "Configurar Buscador semántico":
          this.configSemantic.emit(true);;
          break;

        case "Flujo de datos":
          this.configFlujoDeDatos.emit(true);
          break;
        default:
          this.configSteps.emit(true);
      }
    }
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

  Show(){
    return this.show
  }
}
