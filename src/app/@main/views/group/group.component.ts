import { UpdateGroupComponent } from './../../components/group/update-group/update-group.component';
import { CreateGroupComponent } from './../../components/group/create-group/create-group.component';
import { GroupModel, ColumnNameModel, GroupModelGet } from './../../../@share/models/group.model';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

import * as groupActions from '../../../ngrx/actions/group.action';
import { groupSelector } from './../../../ngrx/reducers/group.reducer';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IAppState } from 'src/app/ngrx/models/base.model';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  listDataGroupDisplay: Array<GroupModel>;
  listMockDataGroupDisplay: Array<GroupModel>;
  columnName!: ColumnNameModel;
  currentPage: number;
  limit: number;
  total: number;
  isLoadingTable!: boolean;
  subscription!: Subscription


  searchValue = '';
  visible = false;

  group$: Observable<any> = this.store.select(groupSelector.selectGroupData);

  constructor(
    private viewContainerRef: ViewContainerRef,
    private modal: NzModalService,
    private nzMessageService: NzMessageService,
    private store: Store<IAppState>
  ) {
    this.isLoadingTable = true;
    this.listMockDataGroupDisplay = [];
    this.listDataGroupDisplay = [];
    this.subscription = new Subscription();
    this.limit = 10;
    this.currentPage = 1;
    this.total = 10;
  }

  ngOnInit(): void {
    //set page option
    this.columnName = {
      sortFn: (a: GroupModel, b: GroupModel) => a.name.localeCompare(b.name),
    };
    this.store.dispatch(new groupActions.getGroupRequest(this.setPageOption(this.currentPage, this.limit)));
    this.getDataGroupFromStore();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

  //subscribe
  getDataGroupFromStore() {
    let groupsSubcribe = this.group$.subscribe((rs: GroupModelGet) => {
      if (rs.success) {
        this.isLoadingTable = false;
        this.listMockDataGroupDisplay = rs.docs;
        this.listDataGroupDisplay = [...this.listMockDataGroupDisplay];
        this.currentPage = rs.page;
        this.limit = rs.limit;
        this.total = rs.totalDocs;
        console.log(this.total);
      }
    })
    this.subscription.add(
      groupsSubcribe
    )
  }

  //change page size 
  onChangePageSize(event: number) {
    this.store.dispatch(new groupActions.getGroupRequest(this.setPageOption(this.currentPage, event)));
  }


  //set pageOption
  setPageOption(currentPage: number, limit: number) {
    this.currentPage = currentPage;
    this.limit = limit;
    return (
      { currentPage: this.currentPage, limit: this.limit }
    )
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listDataGroupDisplay = this.listMockDataGroupDisplay.filter((item: GroupModel) => item.name.indexOf(this.searchValue) !== -1);
  }

  //create model component create group
  createGroupComponentModal(): void {
    const modalCreateGroup = this.modal.create({
      nzTitle: 'Create Group',
      nzContent: CreateGroupComponent,
      nzViewContainerRef: this.viewContainerRef,
      // nzComponentParams: {
      //   title: 'title in component',
      // },
      // nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: [

      ],
      nzWidth: '900px'
    });
    // const instance = modal.getContentComponent();
    modalCreateGroup.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modalCreateGroup.afterClose.subscribe(result => console.log('[afterClose] The result is:', result));
  }

  //update model component create group
  createUpdateGroupComponentModel(id?: string, groupName?: string): void {
    const modalUpdateGroup = this.modal.create({
      nzTitle: 'Update Group',
      nzContent: UpdateGroupComponent,
      nzComponentParams: {
        id: id,
        groupName: groupName
      },
      nzViewContainerRef: this.viewContainerRef,
      // nzComponentParams: {
      //   title: 'title in component',
      // },
      // nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: [

      ],
      nzWidth: '900px'
    });
    // const instance = modal.getContentComponent();
    modalUpdateGroup.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modalUpdateGroup.afterClose.subscribe(result => console.log('[afterClose] The result is:', result));
  }


  //delete group
  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

  confirm(id?: string): void {
    console.log(id);
    this.nzMessageService.info('click confirm');
  }
}
