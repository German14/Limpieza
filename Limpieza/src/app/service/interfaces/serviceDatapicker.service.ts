import {Injectable} from '@angular/core';
import {ButtonsNavigationComponent} from "../../buttons-navigation/buttons-navigation.component";
import {DataServiceClients} from '../serviceClients';
import {MatTableDataSource} from "@angular/material";
import {GithubIssue} from "../service";
import {ServiceModalsService} from "./serviceModals.service";

@Injectable()
export class ServiceDatapickerService {
  public buttonDataBase: ButtonsNavigationComponent;
  public dataClient: MatTableDataSource<GithubIssue>;


  constructor( private tableDataBaseClient: DataServiceClients,
               private serviceModal: ServiceModalsService ) {}

  public infoClick (events:any ,info: any): any {
    return  {
      Garaje: events.filter((data) =>{
        return data.id == info.event.id && data.resourceId === this.serviceModal.TypeGaraje;
      })[0].start,
      Name: info.event._def.title,
      Observations: info.event.extendedProps.observacion,
      Phone: info.event.extendedProps.phone,
      Portal: events.filter((data) =>{
        return data.id == info.event.id && data.resourceId === this.serviceModal.TypePortal;
      })[0].start,
      Tiro: events.filter((data) =>{
        return data.id == info.event.id && data.resourceId === this.serviceModal.TypeTiro;
      })[0].start,
      id: info.event.id
    };
  }

  public placeInfoG(place: string, events: any, oldInfo: any) {
    if(place === this.serviceModal.TypeGaraje) {
      return oldInfo.event.start;
    } else {
      return events.filter((data) =>{
        return data.id == oldInfo.event.id && data.resourceId === this.serviceModal.TypeGaraje
      })[0].start
    }
  }
  public placeInfoT(place: string, events: any, oldInfo: any) {
    if(place === this.serviceModal.TypeTiro) {
      return oldInfo.event.start;
    } else {
      return events.filter((data) => {
        return data.id == oldInfo.event.id && data.resourceId === this.serviceModal.TypeTiro
      })[0].start
    }
  }
  public placeInfoP(place: string, events: any, oldInfo: any) {
    if(place === this.serviceModal.TypePortal) {
      return oldInfo.event.start;
    } else {
      return events.filter((data) => {
        return data.id == oldInfo.event.id && data.resourceId === this.serviceModal.TypePortal
      })[0].start
    }
  }

  public infoDrag (events:any ,oldInfo: any, place: string): any {
    return {
      Garaje: this.placeInfoG(place, events, oldInfo),
      Name: oldInfo.event._def.title,
      Observations: oldInfo.event.extendedProps.observacion,
      Phone: oldInfo.event.extendedProps.phone,
      Portal:this.placeInfoP(place, events, oldInfo),
      Tiro: this.placeInfoT(place, events, oldInfo),
      id: oldInfo.event.id
    };
  }

  serviceClientUpdate(){
    this.tableDataBaseClient.getRepoClients().subscribe(
      (element) => {
        const dataSources = Array.from( {length: 1 } , () => element);
        this.dataClient = new MatTableDataSource(dataSources[0]);
        this.tableDataBaseClient.newCoordinateClientForm.next(this.dataClient);
      });

  }

}


