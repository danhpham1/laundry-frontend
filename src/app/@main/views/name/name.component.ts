import { UpdateNameComponent } from './../../components/name/update-name/update-name.component';
import { CreateNameComponent } from './../../components/name/create-name/create-name.component';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss']
})
export class NameComponent implements OnInit {
  listOfData: any[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];
  constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
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
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => console.log('[afterClose] The result is:', result));
  }

  updateNameComponentModal(id?: string, price?: string, name?: string, idGroup?: string) {
    const modal = this.modal.create({
      nzTitle: 'Name',
      nzContent: UpdateNameComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        // title: 'title in component',
        // subtitle: 'component sub title，will be changed after 2 sec'
      },
      nzFooter: [
      ],
      nzWidth: '900px'
    });
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => console.log('[afterClose] The result is:', result));
  }
}
