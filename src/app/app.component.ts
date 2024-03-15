import {  MenuItem,  ConfirmationService,  MessageService,  ConfirmEventType} from 'primeng/api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer, Representative } from './customer';
import { CustomerService } from './customerservice';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
import { Link, Ambiente } from './model/link';
import { LinkService } from './services/link.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class AppComponent {
  items: MenuItem[] | undefined;
  title = 'sysLnk';
  value = 'hw';
  nombreSistema: String;
  dirUrl: String;
  ambiente: Ambiente[];
  selectedAmbiente!: Ambiente;

  nombreUrl: string;
  direccionUrl: string;

  customers!: Customer[];
  selectedCustomers!: Customer[];
  representatives!: Representative[];
  statuses!: any[];
  loading: boolean = true;
  _id: string;

  //
  links!: Link[];
  selectedLinks!: Link[];

  statusCode: number;

  @ViewChild('dt') dt: Table | undefined;

  constructor(
    private customerService: CustomerService,
    private primengConfig: PrimeNGConfig,
    private linkService: LinkService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  // constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  ngOnInit() {
    this.ambiente = [
      { tipo: 'PRE', descripcion: 'PRUEBAS' },
      { tipo: 'PRO', descripcion: 'PRODUCCION' },
    ];

    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-plus',
      },
      {
        label: 'Nuevo',
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          console.log('new event');
          this.nombreUrl = null;
          this.direccionUrl = null;
          // this.ambiente=null;
          this.showDialog();
        },
      },
    ];

    this.getAllLinks();
    this.primengConfig.ripple = true;
  }

  visible: boolean = false;
  visible2: boolean = false;

  showDialog() {
    this.visible = true;
  }

  showDialog2() {
    this.visible2 = true;
  }

  getAllLinks() {
    this.linkService.getAllLinks().subscribe(
      (res) => {
        (this.links = res.data), console.log(res);
        this.loading = false;
      },
      (errorCode) => (this.statusCode = errorCode)
    );
  }

  createLink() {
    console.log(this.nombreUrl, this.direccionUrl, this.selectedAmbiente);

    const parIn = {
      nombre: this.nombreUrl,
      url: this.direccionUrl,
      ambiente: this.selectedAmbiente,
    };

    this.linkService.createLink(parIn).subscribe(
      (statusCode) => {
        this.statusCode = statusCode;
        this.getAllLinks();
        this.visible = false;
      },
      (errorCode) => (this.statusCode = errorCode)
    );
  }

  showUpdateLink(lnk: any) {
    this.nombreUrl = lnk.nombre;
    this.direccionUrl = lnk.url;
    this.selectedAmbiente = lnk.ambiente;
    this._id = lnk._id;
    this.showDialog2();
  }

  updateLink() {
    console.log('try update');

    console.log(
      this._id,
      this.nombreUrl,
      this.direccionUrl,
      this.selectedAmbiente
    );

    const parIn = {
      nombre: this.nombreUrl,
      url: this.direccionUrl,
      ambiente: this.selectedAmbiente,
    };

    this.linkService.updateLink(this._id, parIn).subscribe(
      (statusCode) => {
        this.statusCode = 200;
        this.getAllLinks();
        this.visible2 = false;
      },
      (errorCode) => (this.statusCode = errorCode)
    );
  }

  deleteLink2(lnk: any) {
    console.log(lnk._id);
    this.linkService.deleteLink(lnk._id).subscribe(
      (statusCode) => {
        this.statusCode = 200;
        this.getAllLinks();
        //  this.visible2 = false;
      },
      (errorCode) => (this.statusCode = errorCode)
    );
  }

  confirm1(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'You have accepted',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
  }

  confirm2(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Record deleted',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }

  // confirm2(event: Event) {
  //   this.confirmationService.confirm({
  //       target: event.target as EventTarget,
  //       message: 'Do you want to delete this record?',
  //       header: 'Delete Confirmation',
  //       icon: 'pi pi-info-circle',
  //       acceptButtonStyleClass:"p-button-danger p-button-text",
  //       rejectButtonStyleClass:"p-button-text p-button-text",
  //       acceptIcon:"none",
  //       rejectIcon:"none",

  //       accept: () => {
  //           this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
  //       },
  //       reject: () => {
  //           this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
  //       }
  //   });
  // }

  // deleteLink24(lnk: any) {
  //   console.log(lnk._id)
  //   this.linkService.deleteLink(lnk._id).subscribe(
  //     (statusCode) => {
  //       this.statusCode = 200;
  //       this.getAllLinks();
  //     //  this.visible2 = false;
  //     },
  //     (errorCode) => (this.statusCode = errorCode)
  //   );

  // }

  deleteLink(event: Event, lnk: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estás seguro de borrar el registro?',
      header: 'Borrar',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        console.log(lnk._id);
        this.linkService.deleteLink(lnk._id).subscribe(
          (statusCode) => {
            this.statusCode = 200;
            this.getAllLinks();
            //  this.visible2 = false;
          },
          (errorCode) => (this.statusCode = errorCode)
        );
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Registro eliminado',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'Petición rechazada',
        });
      },
    });
  }
}
