import {Injectable} from '@angular/core';


@Injectable()
export class ServiceSidenav {

  arrayItems=[{
    id:'0',
    name:'Trabajadoras',
    url:'table',
    enable:false,
    icon:'build'
  },
    {
      id:'1',
      name:'Clientes',
      url:'client',
      enable:true,
      icon: 'assignment_ind'
    },
    {
      id:'2',
      name:'Parseador',
      url:'parseador',
      enable:true,
      icon: 'assignment'
    },
    {
      id:'3',
      name:'Calendario',
      url:'date',
      enable:true,
      icon: 'perm_contact_calendar'
    }
    ];


}


