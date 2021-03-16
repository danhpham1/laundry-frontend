import { IPageOptions } from './../../../@share/models/action.model';
import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';

import { UpdateLaundryComponent } from './../../components/laundry/update-laundry/update-laundry.component';
import { CreateLaundryComponent } from '../../components/laundry/create-laundry/create-laundry.component';

import { IAppState } from 'src/app/ngrx/models/base.model';

import { IGetAllGroups, IGroupAll } from '../../../@share/models/group.model';
import { groupSelector } from '../../../ngrx/reducers/group.reducer';
import * as groupActions from '../../../ngrx/actions/group.action';

import * as laundryActions from '../../../ngrx/actions/laundry.action';
import { laundrySelector } from './../../../ngrx/reducers/laundry.reducer';
import { IGetLaundryResponse, ILaundry } from 'src/app/@share/models/laundry.model';

@Component({
  selector: 'app-laundry',
  templateUrl: './laundry.component.html',
  styleUrls: ['./laundry.component.scss']
})
export class LaundryComponent implements OnInit {
  subscribe: Subscription;
  allGroup: Array<IGroupAll>;
  laundryData:Array<ILaundry>;
  total:number;
  pageSize:number;
  pageIndex:number;
  isLoadingTable:boolean;
  buttonCreateDisable:boolean;
  
  allGroup$: Observable<IGetAllGroups> = this.store.select(groupSelector.selectAllGroupData);
  laundryData$:Observable<IGetLaundryResponse> = this.store.select(laundrySelector.selectLaundryData);
  error$: Observable<any> = this.store.select(laundrySelector.selectError);


  constructor(
    private viewContainerRef: ViewContainerRef,
    private modal: NzModalService,
    private nzMessageService: NzMessageService,
    private store:Store<IAppState>
  ) { 
    this.allGroup = [];
    this.subscribe = new Subscription();
    this.getAllGroup();

    this.laundryData = [];

    this.isLoadingTable = true;

    this.total = 0;
    this.pageSize = 10;
    this.pageIndex = 1;

    this.buttonCreateDisable = true;
  }

  ngOnInit(): void {
    this.getAllLaundry();
    this.subscripLaundry();
    this.handleError();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscribe.unsubscribe();
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
      this.getAllLaundry({
        currentPage: this.pageIndex,
        limit: this.pageSize
      })
    });
  }

  updateLaundryComponentModel(id?:string,name?:string,group?:string,price?:number,weight?:number,total?:number){
    const modalUpdateLaundry = this.modal.create({
      nzTitle: 'Update Laundry',
      nzContent: UpdateLaundryComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams:{
        id:id,
        name:name,
        group:group,
        price:price,
        weight:weight,
        total:total,
        allGroups: this.allGroup
      },
      nzFooter: [
      ],
      nzWidth: '900px'
    });
    modalUpdateLaundry.afterOpen.subscribe(() => { });
    // Return a result when closed
    modalUpdateLaundry.afterClose.subscribe(result => {
      this.getAllLaundry({
        currentPage: this.pageIndex,
        limit: this.pageSize
      })
    });
  }

  //change params in table
  onChangeQueryParams(params: NzTableQueryParams) {
    this.pageIndex = params.pageIndex;
    this.pageSize = params.pageSize;

    let pageOptions = {
      currentPage: params.pageIndex,
      limit: params.pageSize
    };
    this.getAllLaundry(pageOptions);
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

  //getLaundry 
  private getAllLaundry(pageOption?:IPageOptions){
    if(pageOption){
      this.store.dispatch(new laundryActions.getLaundryRequest({...pageOption}));
    }else{
      this.store.dispatch(new laundryActions.getLaundryRequest());
    }
  }

  private subscripLaundry(){
    let laundryDataSub = this.laundryData$.subscribe(rs => {
      if (rs.success) {
        this.laundryData = rs.docs;
        this.total = rs.totalDocs;
        this.pageSize = rs.limit;
        this.pageIndex = rs.page;
        this.isLoadingTable = false;
        this.buttonCreateDisable = false;
      }
    })
    this.subscribe.add(laundryDataSub);
  }
  //handle error
  private handleError(){
    this.store.dispatch(new laundryActions.getLaundryFailed());
    let errorSub = this.error$.subscribe(rs=>{
      if(rs){
        this.nzMessageService.create('error','Load data from server failed!');
        this.isLoadingTable = false;
        this.laundryData = [];
      }
    })
    this.subscribe.add(errorSub);
  }
}
