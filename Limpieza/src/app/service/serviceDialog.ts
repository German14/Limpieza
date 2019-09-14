import {
  Injectable,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  EmbeddedViewRef,
  ComponentRef,
  Type,
} from '@angular/core'

import {MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ButtonsNavigationComponent} from "../buttons-navigation/buttons-navigation.component";
import {FormClientsComponent} from '../form-clients/form-clients.component';

@Injectable({
  providedIn: "root"
})

export class ServiceDialog {
  dialogComponentRef: ComponentRef<ServiceDialog>;

  constructor( private componentFactoryResolver: ComponentFactoryResolver,
               private appRef: ApplicationRef,
               private injector: Injector,
               private dialog: MatDialog
               ){

  }
  appendDialogComponentToBody(com){

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(com);
    const componentRef = componentFactory.create(this.injector);
    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

  }
  private removeDialogComponentFromBody() {
    this.appRef.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();
  }
  public open(componentType: Type<any>, row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = row;
    dialogConfig.width = '500px';
    this.dialog.open(componentType, dialogConfig);
    //this.appendDialogComponentToBody(componentType);
  }
}


