import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

import { UpdateLaundryComponent } from './../../components/laundry/update-laundry/update-laundry.component';
import { CreateLaundryComponent } from '../../components/laundry/create-laundry/create-laundry.component';
@Component({
  selector: 'app-laundry',
  templateUrl: './laundry.component.html',
  styleUrls: ['./laundry.component.scss']
})
export class LaundryComponent implements OnInit {

  constructor(
    private viewContainerRef: ViewContainerRef,
    private modal: NzModalService,
    private nzMessageService: NzMessageService,
  ) { }

  ngOnInit(): void {
  }


  createLaundryComponentModel(){
    const modalCreateLaundry = this.modal.create({
      nzTitle: 'Create Laundry',
      nzContent: CreateLaundryComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: [
      ],
      nzWidth: '900px'
    });
    modalCreateLaundry.afterOpen.subscribe(() => { });
    // Return a result when closed
    modalCreateLaundry.afterClose.subscribe(result => {
     
    });
  }

  updateLaundryComponentModel(name?:string,group?:string,price?:number,weight?:number,total?:number){
    const modalUpdateLaundry = this.modal.create({
      nzTitle: 'Update Laundry',
      nzContent: UpdateLaundryComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: [
      ],
      nzWidth: '900px'
    });
    modalUpdateLaundry.afterOpen.subscribe(() => { });
    // Return a result when closed
    modalUpdateLaundry.afterClose.subscribe(result => {
    });
  }
}
