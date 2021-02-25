import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import { UpdateNameComponent } from './../../components/name/update-name/update-name.component';
import { CreateNameComponent } from './../../components/name/create-name/create-name.component';

import * as nameActions from '../../../ngrx/actions/name.action';
import { IAppState } from '../../../ngrx/models/base.model';
import { nameSelector } from './../../../ngrx/reducers/name.reducer';
import { IGetNameResponse, INameModel, IDeleteNameResponse } from './../../../@share/models/name.model';
import { IDeleteGroupResponse } from 'src/app/@share/models/group.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss']
})
export class NameComponent implements OnInit {
  
  listOfData: Array<INameModel>;
  isLoadingTable:boolean;
  subscription!:Subscription;
  pageSize:number;
  total:number;
  pageIndex:number;

  //store
  namesList$: Observable<IGetNameResponse> = this.store.select(nameSelector.selectNameResponse);
  nameDelete$:Observable<IDeleteNameResponse> = this.store.select(nameSelector.selectDeleteNameResponse);
  error$:Observable<any> = this.store.select(nameSelector.selectNameError);

  constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private store:Store<IAppState>,
    private nzMessageService: NzMessageService,
  ) {
    this.listOfData = [];
    this.isLoadingTable = true;
    this.subscription = new Subscription();
    this.pageSize = 10;
    this.total = 0;
    this.pageIndex = 1;
  }

  ngOnInit(): void {

    //dispatch  actions
    this.distpatchNamesStore();
    //check error
    this.checkError();
    //subscribe
    this.subscribeNameList();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

  //distpatch get list names
  distpatchNamesStore(pageOptions?:any){
    if(pageOptions){
      this.store.dispatch(new nameActions.getNameRequest(pageOptions));
    }else{
      this.store.dispatch(new nameActions.getNameRequest());
    }
  }

  //subscribe get Name list
  subscribeNameList(){
    let nameSubcribe = this.namesList$.subscribe(rs=>{
      if(rs.success){
        this.listOfData = rs.docs;
        this.isLoadingTable = false;
        this.total = rs.totalDocs;
        this.pageIndex = rs.page;
        this.pageSize = rs.limit;
      }
    })
    this.subscription.add(nameSubcribe);
  }

  //change params in table
  onChangeQueryParams(params: NzTableQueryParams){
    this.pageIndex = params.pageIndex;
    this.pageSize = params.pageSize;

    let pageOptions = {
      currentPage:params.pageIndex,
      limit:params.pageSize
    };
    this.distpatchNamesStore(pageOptions);
  }

  //modal create name component
  createNameComponentModal(): void {
    const modal = this.modal.create({
      nzTitle: 'Name',
      nzContent: CreateNameComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        // title: 'title in component',
        // subtitle: 'component sub title，will be changed after 2 sec'
      },
      nzFooter: [
      ],
      nzWidth: '900px'
    });
    modal.afterOpen.subscribe();
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      this.distpatchNamesStore();
    });
  }
  //modal update name component
  updateNameComponentModal(id?: string, price?: number, name?: string, idGroup?: string) {
    const modal = this.modal.create({
      nzTitle: 'Name',
      nzContent: UpdateNameComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        idName:id,
        price:price,
        name:name,
        idGroup:idGroup
      },
      nzFooter: [
      ],
      nzWidth: '900px'
    });
    // modal.afterOpen.subscribe();
    // Return a result when closed
    modal.afterClose.subscribe(() => {
      this.distpatchNamesStore();
    });
  }

  //check error
  checkError() {
    const subscribeError = this.error$.subscribe(error => {
      if (error) {
        this.isLoadingTable = false;
        this.nzMessageService.create('error', 'Load data from server failed');
      }
    })
    this.subscription.add(subscribeError);
  }

  //confirm to delete name 
  deleteName(id:string,idGroup:string){
    // console.log(id);
    this.handleDeleteName(id,idGroup);
  }

  private handleDeleteName(id:string,idGroup:string){
    this.store.dispatch(new nameActions.deleteNameRequest({ idName: id, idGroup:idGroup }));
    this.nameDelete$
    .pipe(take(2))   
    .subscribe(rs=>{
      if(rs.success){
        this.nzMessageService.create('success','Name deleted success!');
        this.distpatchNamesStore();
      }
      if(rs.error){
        this.nzMessageService.create('error','Name deleted failed!');
      }
    })
  }
}
