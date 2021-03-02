import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

import { UpdateGroupComponent } from './../../components/group/update-group/update-group.component';
import { CreateGroupComponent } from './../../components/group/create-group/create-group.component';

import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import * as groupActions from '../../../ngrx/actions/group.action';
import { IAppState } from '../../../ngrx/models/base.model';
import { groupSelector } from './../../../ngrx/reducers/group.reducer';

import { ISort } from '../../../@share/models/action.model';
import { GroupModel, ColumnNameModel, IGroupModelGet } from './../../../@share/models/group.model';

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
  subscription!: Subscription;
  sort!: ISort;
  buttoncreateDisable:boolean;


  searchValue = '';
  visible = false;

  group$: Observable<any> = this.store.select(groupSelector.selectGroupData);
  groupDelete$: Observable<boolean | undefined> = this.store.select(groupSelector.selectDelteGroupResponse);
  error$: Observable<any> = this.store.select(groupSelector.selectGroupFailed);

  constructor(
    private viewContainerRef: ViewContainerRef,
    private modal: NzModalService,
    private nzMessageService: NzMessageService,
    private store: Store<IAppState>
  ) {
    this.buttoncreateDisable = true;
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
    this.checkError();
    this.getDataGroupFromStore();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

  //subscribe
  getDataGroupFromStore() {
    let groupsSubcribe = this.group$.subscribe((rs: IGroupModelGet) => {
      if (rs.success) {
        this.isLoadingTable = false;
        this.listMockDataGroupDisplay = rs.docs;
        this.listDataGroupDisplay = [...this.listMockDataGroupDisplay];
        this.currentPage = rs.page;
        this.limit = rs.limit;
        this.total = rs.totalDocs;
        this.buttoncreateDisable = false;
      }
    })
    this.subscription.add(
      groupsSubcribe
    )
  }

  //set pageOption
  setPageOption(currentPage: number, limit: number) {
    this.currentPage = currentPage;
    this.limit = limit;
    return (
      { currentPage: this.currentPage, limit: this.limit }
    )
  }

  //change query params
  onQueryParamsChange(params: NzTableQueryParams): void {
    //set current page
    if (this.currentPage !== params.pageIndex) {
      this.currentPage = params.pageIndex;
    }
    //set page size
    if (this.limit !== params.pageSize) {
      this.limit = params.pageSize;
    }


    this.sort = params.sort.reduce((object: any, el) => {
      if (el.value !== null) {
        let key = el.key;
        if (el.value == 'ascend') {
          object[key] = 'asc';
        }
        if (el.value == 'descend') {
          object[key] = 'desc';
        }
      }
      return object;
    }, {});
    this.distpatchGetGroupList();
  }

  //create model component create group
  createGroupComponentModal(): void {
    const modalCreateGroup = this.modal.create({
      nzTitle: 'Create Group',
      nzContent: CreateGroupComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: [
      ],
      nzWidth: '900px'
    });
    modalCreateGroup.afterOpen.subscribe(() => { });
    // Return a result when closed
    modalCreateGroup.afterClose.subscribe(result => {
      this.distpatchGetGroupList();
    });
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
      nzFooter: [
      ],
      nzWidth: '900px'
    });
    modalUpdateGroup.afterOpen.subscribe(() => { });
    // Return a result when closed
    modalUpdateGroup.afterClose.subscribe(result => {
      this.distpatchGetGroupList();
    });
  }


  //delete group
  confirm(id?: string): void {
    this.store.dispatch(new groupActions.deleteGroupRequest({
      id: id
    }))
    let groupSubscribe = this.groupDelete$
      .pipe(take(2))
      .subscribe(rs => {
        console.log(rs);
        if (rs === true) {
          this.nzMessageService.create('success', 'Group delete successful!');
          this.distpatchGetGroupList();
        }
        if (rs === false) {
          this.nzMessageService.create('error', 'Group delete failed!');
        }
      })
    this.subscription.add(groupSubscribe);
  }

  //call get list group
  distpatchGetGroupList() {
    let newQuery = { ...this.setPageOption(this.currentPage, this.limit), sort: this.sort };
    this.store.dispatch(new groupActions.getGroupRequest(newQuery));
  }

  //set function for find field name
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listDataGroupDisplay = this.listMockDataGroupDisplay.filter((item: GroupModel) => item.name.indexOf(this.searchValue) !== -1);
  }


  //set server when loading failed
  checkError() {
    const subscribeError = this.error$.subscribe(error => {
      if (error) {
        this.isLoadingTable = false;
        this.buttoncreateDisable = true;
        this.nzMessageService.create('error', 'Load data from server failed');
      }
    })
    this.subscription.add(subscribeError);
  }
}
