import { UpdateGroupComponent } from './../../components/group/update-group/update-group.component';
import { CreateGroupComponent } from './../../components/group/create-group/create-group.component';
import { GroupModel, ColumnNameModel } from './../../../@share/models/group.model';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  mocDataGroup!: Array<GroupModel>;
  listMockDataGroupDisplay!: Array<GroupModel>;
  columnName!: ColumnNameModel;

  searchValue = '';
  visible = false;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private modal: NzModalService,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.mocDataGroup = [
      {
        _id: "5fe3645cf47eca3ad8498902",
        name: "Group1",
        createAt: new Date(),
      },
      {
        _id: "5fe3645cf47eca3ad8498902",
        name: "Group2",
        createAt: new Date(),
      },
      {
        _id: "5fe3645cf47eca3ad8498902",
        name: "Group3",
        createAt: new Date(),
      },
      {
        _id: "5fe3645cf47eca3ad8498902",
        name: "Group4",
        createAt: new Date(),
      },
      {
        _id: "5fe3645cf47eca3ad8498902",
        name: "Group5",
        createAt: new Date(),
      },
      {
        _id: "5fe3645cf47eca3ad8498902",
        name: "Group6",
        createAt: new Date(),
      },
      {
        _id: "5fe3645cf47eca3ad8498902",
        name: "Group7",
        createAt: new Date(),
      },
      {
        _id: "5fe3645cf47eca3ad8498902",
        name: "Group8",
        createAt: new Date(),
      }
    ]
    this.listMockDataGroupDisplay = [...this.mocDataGroup];
    this.columnName = {
      sortFn: (a: GroupModel, b: GroupModel) => a.name.localeCompare(b.name),
    };
  }


  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listMockDataGroupDisplay = this.mocDataGroup.filter((item: GroupModel) => item.name.indexOf(this.searchValue) !== -1);
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
