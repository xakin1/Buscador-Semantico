import { Component } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { ConfigurationSearchBoxHomeComponent } from './configuration/configuration-search-box-home/configuration-search-box-home.component';
import { TreeComponent } from './configuration/tree/tree.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private route:Router) { }
  title = 'Buscador-semantico';
  opened: boolean = false;
  baseUrl =window.location.origin+"/xaquin/"

  routes: Routes = [
    {
      path: '',
      component: TreeComponent
    },
    {
      path: 'configuration/steps',
      component: TreeComponent
    },
    {
      path: 'configuration/searchBox', component: ConfigurationSearchBoxHomeComponent
    }
  ];

  toggleSidebar() {
    this.opened = !this.opened;
  }

  goTo(url){
    this.route.navigate([url]);
    this.toggleSidebar();
  }
}
