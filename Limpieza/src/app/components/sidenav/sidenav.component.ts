import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  arrayItems=[{
    id:'0',
    name:'Trabajadoras',
    url:'table',
    enable:true
  },
    {
    id:'1',
    name:'Clientes',
    url:'client',
    enable:false
  }];
  constructor() { }

  ngOnInit() {
  }

}
