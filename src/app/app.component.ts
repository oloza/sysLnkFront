import { MenuItem } from 'primeng/api';
// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer, Representative } from './customer';
import { CustomerService } from './customerservice';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: MenuItem[] | undefined;
  title = 'sysLnk';
  value = 'hw';
  // customers: any;
  // loading: any;
  nombreSistema: String;
  dirUrl:String;
  
  customers!: Customer[];
  selectedCustomers!: Customer[];
  representatives!: Representative[];
  statuses!: any[];
  loading: boolean = true;

  //@ViewChild('dt') table!: Table ;

  @ViewChild('dt') dt: Table | undefined;

  constructor(private customerService: CustomerService, private primengConfig: PrimeNGConfig) { }

  
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }


  ngOnInit() {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-plus',
      },
      {
        label: 'Nuevo',
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
          //event.originalEvent: Browser event
          //event.item: menuitem metadata
          console.log('new event');
          this.showDialog();
        }
      }
    ];

    this.customerService.getCustomersLarge().then(customers => {
      this.customers = customers;
      this.loading = false;
  });

  this.representatives = [
      {name: "Amy Elsner", image: 'amyelsner.png'},
      {name: "Anna Fali", image: 'annafali.png'},
      {name: "Asiya Javayant", image: 'asiyajavayant.png'},
      {name: "Bernardo Dominic", image: 'bernardodominic.png'},
      {name: "Elwin Sharvill", image: 'elwinsharvill.png'},
      {name: "Ioni Bowcher", image: 'ionibowcher.png'},
      {name: "Ivan Magalhaes",image: 'ivanmagalhaes.png'},
      {name: "Onyama Limba", image: 'onyamalimba.png'},
      {name: "Stephen Shaw", image: 'stephenshaw.png'},
      {name: "XuXue Feng", image: 'xuxuefeng.png'}
  ];

  this.statuses = [
      {label: 'Unqualified', value: 'unqualified'},
      {label: 'Qualified', value: 'qualified'},
      {label: 'New', value: 'new'},
      {label: 'Negotiation', value: 'negotiation'},
      {label: 'Renewal', value: 'renewal'},
      {label: 'Proposal', value: 'proposal'}
  ]
  this.primengConfig.ripple = true;

  }

  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }

}