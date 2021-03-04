import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';

import { UpdateLaundryComponent } from './../../components/laundry/update-laundry/update-laundry.component';
import { CreateLaundryComponent } from '../../components/laundry/create-laundry/create-laundry.component';

import { IGetAllGroups, IGroupAll } from '../../../@share/models/group.model';
import { groupSelector } from '../../../ngrx/reducers/group.reducer';
import * as groupActions from '../../../ngrx/actions/group.action';
import { IAppState } from 'src/app/ngrx/models/base.model';

@Component({
  selector: 'app-laundry',
  templateUrl: './laundry.component.html',
  styleUrls: ['./laundry.component.scss']
})
export class LaundryComponent implements OnInit {
  subscribe: Subscription;
  allGroup: Array<IGroupAll>;
  
  allGroup$: Observable<IGetAllGroups> = this.store.select(groupSelector.selectAllGroupData);

  constructor(
    private viewContainerRef: ViewContainerRef,
    private modal: NzModalService,
    private nzMessageService: NzMessageService,
    private store:Store<IAppState>
  ) { 
    this.allGroup = [];
    this.subscribe = new Subscription();
    this.getAllGroup();
  }

  ngOnInit(): void {
  }


  createLaundryComponentModel(){
    const modalCreateLaundry = this.modal.create({
      nzTitle: 'Create Laundry',
      nzContent: CreateLaundryComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams:{
        allGroups:this.allGroup
      },
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

  //get all group
  private getAllGroup(){
    this.store.dispatch(new groupActions.getAllGroupRequest());
    let allGroupSub = this.allGroup$.subscribe(rs=>{
      if(rs.success){
        this.allGroup = rs.data;
      }else{
        this.allGroup = [];
      }
    })
    this.subscribe.add(allGroupSub);
  }
}
